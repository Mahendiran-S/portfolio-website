import { createWorker } from 'tesseract.js';

export interface ExtractedCertificateData {
  title?: string;
  issuer?: string;
  issueDate?: string;
  credentialId?: string;
  category?: 'AWS' | 'NPTEL' | 'Internship' | 'Hackathons' | 'Workshops' | 'Coursera' | 'Udemy' | 'Other';
  rawText?: string;
}

/**
 * Converts a File or Blob object into a base64 Data URL so Tesseract.js can load it safely in browser context
 */
function fileToDataURL(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Decodes text streams directly from a PDF file in the browser (supports native PDFs from AWS, Coursera, Udemy, NPTEL, Cognifyz, etc.)
 */
async function extractTextFromPDFBuffer(file: File | Blob): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  const decoder = new TextDecoder('latin1');
  const pdfString = decoder.decode(bytes);

  const textSegments: string[] = [];

  // Match PDF text blocks between BT (Begin Text) and ET (End Text)
  const btEtRegex = /BT[\s\S]*?ET/g;
  let match: RegExpExecArray | null;

  while ((match = btEtRegex.exec(pdfString)) !== null) {
    const block = match[0];
    const strRegex = /\(([\s\S]*?)\)\s*T[jJ]/g;
    let strMatch: RegExpExecArray | null;

    while ((strMatch = strRegex.exec(block)) !== null) {
      const decoded = strMatch[1]
        .replace(/\\([0-7]{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
        .replace(/\\(.)/g, '$1')
        .trim();

      if (decoded.length > 1) {
        textSegments.push(decoded);
      }
    }
  }

  // Fallback pattern matcher for readable text streams
  if (textSegments.length < 3) {
    const rawMatches = pdfString.match(/[A-Za-z0-9\s,.-]{5,80}/g);
    if (rawMatches) {
      const cleanCandidates = rawMatches
        .map((s) => s.trim())
        .filter(
          (s) =>
            s.length > 5 &&
            !/obj|endobj|stream|endstream|xref|trailer|Catalog|Pages|Parent|Font|Encoding|Type|Filter|FlateDecode/i.test(s)
        );
      textSegments.push(...cleanCandidates);
    }
  }

  return textSegments.join('\n');
}

/**
 * Parses raw text extracted from a certificate image or PDF using smart NLP/Regex rules
 */
export function parseCertificateText(rawText: string): ExtractedCertificateData {
  const text = rawText.replace(/\r\n/g, '\n');
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  let title = '';
  let issuer = '';
  let issueDate = '';
  let credentialId = '';
  let category: ExtractedCertificateData['category'] = 'Other';

  // 1. Detect Category & Issuer
  const upper = text.toUpperCase();

  if (upper.includes('AWS') || upper.includes('AMAZON WEB SERVICES')) {
    category = 'AWS';
    issuer = 'Amazon Web Services';
  } else if (upper.includes('NPTEL') || upper.includes('SWAYAM') || upper.includes('IIT')) {
    category = 'NPTEL';
    issuer = text.match(/IIT\s+[A-Za-z]+/i)?.[0] ?? 'NPTEL';
  } else if (upper.includes('COGNIFYZ')) {
    category = 'Internship';
    issuer = 'Cognifyz Technologies';
  } else if (upper.includes('INTERN') || upper.includes('INTERNSHIP')) {
    category = 'Internship';
  } else if (upper.includes('HACKATHON')) {
    category = 'Hackathons';
  } else if (upper.includes('WORKSHOP') || upper.includes('BOOTCAMP')) {
    category = 'Workshops';
  } else if (upper.includes('COURSERA')) {
    category = 'Coursera';
    issuer = 'Coursera';
  } else if (upper.includes('UDEMY')) {
    category = 'Udemy';
    issuer = 'Udemy';
  }

  // 2. Extract Title
  for (const line of lines) {
    if (
      /certificate of|this is to certify|certifies that|has successfully|achievement in|completed/i.test(line)
    ) {
      continue;
    }
    if (/certified|developer|architect|practitioner|engineer|specialist|design|fundamentals|full stack|completion/i.test(line)) {
      title = line;
      break;
    }
  }

  if (!title) {
    const candidateLines = lines.filter(
      (l) => l.length > 5 && l.length < 80 && !/certify|present|grant|award|verify|date|issued/i.test(l)
    );
    if (candidateLines.length > 0) {
      title = candidateLines[0];
    }
  }

  // 3. Extract Issuer if not found
  if (!issuer) {
    for (const line of lines) {
      if (/issued by|offered by|organization|university|institute|academy|technologies|solutions/i.test(line)) {
        issuer = line.replace(/issued by|offered by|organization:/gi, '').trim();
        break;
      }
    }
  }

  // 4. Extract Issue Date
  const dateMatch = text.match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b|\b\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4}\b|\b20\d{2}\b/i
  );
  if (dateMatch) {
    issueDate = dateMatch[0];
  }

  // 5. Extract Credential ID
  const credentialMatch = text.match(
    /(?:credential\s*id|cert\s*id|verification\s*code|id|no[.:])\s*[:#-]?\s*([A-Z0-9-]{5,30})/i
  );
  if (credentialMatch) {
    credentialId = credentialMatch[1];
  }

  return {
    title: title || undefined,
    issuer: issuer || undefined,
    issueDate: issueDate || undefined,
    credentialId: credentialId || undefined,
    category,
    rawText: text,
  };
}

/**
 * Runs OCR or PDF Text Decoding on a File, Blob, or URL and extracts certificate fields
 */
export async function extractCertificateFromImage(
  imageSource: File | Blob | string
): Promise<ExtractedCertificateData> {
  // If it's a PDF file, use high-speed browser PDF stream decoding
  if (typeof imageSource !== 'string') {
    const fileType = (imageSource as File).type || '';
    const fileName = (imageSource as File).name || '';

    if (fileType.includes('pdf') || fileName.toLowerCase().endsWith('.pdf')) {
      try {
        const pdfText = await extractTextFromPDFBuffer(imageSource);
        if (pdfText && pdfText.trim().length > 10) {
          return parseCertificateText(pdfText);
        }
      } catch (pdfErr) {
        console.warn('PDF stream decoding failed, falling back to OCR:', pdfErr);
      }
    }
  }

  // Image processing via Tesseract OCR
  let sourceToRecognize: string = '';

  if (typeof imageSource === 'string') {
    sourceToRecognize = imageSource;
  } else {
    sourceToRecognize = await fileToDataURL(imageSource);
  }

  const worker = await createWorker('eng');

  try {
    const ret = await worker.recognize(sourceToRecognize);
    await worker.terminate();
    return parseCertificateText(ret.data.text);
  } catch (err) {
    await worker.terminate();
    console.error('OCR Extraction error:', err);
    throw err;
  }
}
