import React, { useState } from 'react';
import { set, PatchEvent } from 'sanity';
import { Card, Text, Stack, Box, Spinner, Badge, Flex } from '@sanity/ui';
import { extractCertificateFromImage } from '@/lib/certificateExtractor';

export function CertificateAutoFiller(props: any) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [lastExtracted, setLastExtracted] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setProgressStatus('Scanning certificate image with AI OCR...');

    try {
      const extracted = await extractCertificateFromImage(file);

      // Create patch operations for Sanity form fields
      const patches: any[] = [];

      if (extracted.title) {
        patches.push(set(extracted.title, ['title']));
      }
      if (extracted.issuer) {
        patches.push(set(extracted.issuer, ['issuer']));
      }
      if (extracted.issueDate) {
        patches.push(set(extracted.issueDate, ['issueDate']));
      }
      if (extracted.credentialId) {
        patches.push(set(extracted.credentialId, ['credentialId']));
      }
      if (extracted.category) {
        patches.push(set(extracted.category, ['category']));
      }

      // Apply patches to the form
      if (patches.length > 0) {
        props.onChange(PatchEvent.from(patches));
      }

      setLastExtracted(
        `Extracted: "${extracted.title ?? 'Certificate'}" issued by "${extracted.issuer ?? 'Unknown'}" (${extracted.category})`
      );
    } catch (err) {
      console.error('Auto-fill error:', err);
      setLastExtracted('Could not auto-read image. You can manually enter details below.');
    } finally {
      setIsAnalyzing(false);
      setProgressStatus('');
    }
  };

  return (
    <Card padding={4} radius={3} shadow={1} tone="primary" style={{ marginBottom: '16px', backgroundColor: '#13151a', border: '1px solid #282d39' }}>
      <Stack space={3}>
        <Flex justify="space-between" align="center">
          <Text size={2} weight="bold" style={{ color: '#fff' }}>
            ✨ AI Certificate Auto-Filler
          </Text>
          <Badge tone="positive">Editable</Badge>
        </Flex>

        <Text size={1} style={{ color: '#9aa0a6' }}>
          Upload your certificate image to automatically read and pre-fill the Certificate Name, Issued By, Issue Date, Credential ID, and Category. All fields remain 100% editable!
        </Text>

        <Box marginTop={2}>
          <label style={{ cursor: isAnalyzing ? 'not-allowed' : 'pointer', display: 'inline-block' }}>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={isAnalyzing}
            />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#22c55e',
                color: '#000',
                fontWeight: 600,
                fontSize: '13px',
                transition: 'opacity 0.2s',
                opacity: isAnalyzing ? 0.6 : 1,
              }}
            >
              {isAnalyzing ? (
                <>
                  <Spinner size={1} />
                  <span>{progressStatus}</span>
                </>
              ) : (
                <span>📷 Upload Certificate & Auto-Fill Fields</span>
              )}
            </span>
          </label>
        </Box>

        {lastExtracted && (
          <Text size={1} style={{ color: '#4ade80', marginTop: '8px' }}>
            ✅ {lastExtracted}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
