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
 * Parses raw text extracted from a certificate image using smart NLP/Regex rules
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
    if (/certified|developer|architect|practitioner|engineer|specialist|design|fundamentals|full stack/i.test(line)) {
      title = line;
      break;
    }
  }

  if (!title) {
    // Fallback: pick the line with highest capital letters / prominent heading
    const candidateLines = lines.filter(
      (l) => l.length > 5 && l.length < 80 && !/certify|present|grant|award|verify/i.test(l)
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
 * Runs OCR on an image File, Blob, or URL and extracts certificate fields
 */
export async function extractCertificateFromImage(
  imageSource: File | Blob | string
): Promise<ExtractedCertificateData> {
  let sourceToRecognize: string = '';

  if (typeof imageSource === 'string') {
    sourceToRecognize = imageSource;
  } else {
    // Check if it's a PDF file
    const fileType = (imageSource as File).type || '';
    const fileName = (imageSource as File).name || '';
    if (fileType.includes('pdf') || fileName.toLowerCase().endsWith('.pdf')) {
      throw new Error('PDF files cannot be processed directly by OCR. Please upload an image of your certificate (PNG, JPG, WEBP).');
    }
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
