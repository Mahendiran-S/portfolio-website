import React, { useState, useCallback } from 'react';
import { set, PatchEvent } from 'sanity';
import { Card, Text, Stack, Box, Spinner, Badge, Flex } from '@sanity/ui';
import { extractCertificateFromImage } from '@/lib/certificateExtractor';

export function CertificateAutoFiller(props: any) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [lastExtracted, setLastExtracted] = useState<string | null>(null);

  const processFile = useCallback(
    async (file: File) => {
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
      } catch (err: any) {
        console.error('Auto-fill error:', err);
        setLastExtracted(err?.message || 'Could not auto-read image. You can manually enter details below.');
      } finally {
        setIsAnalyzing(false);
        setProgressStatus('');
      }
    },
    [props]
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <Card
      padding={4}
      radius={3}
      shadow={1}
      tone="primary"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        marginBottom: '20px',
        backgroundColor: isDragging ? '#1a2e22' : '#13151a',
        border: isDragging ? '2px dashed #22c55e' : '1px solid #282d39',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      <Stack space={3}>
        <Flex justify="space-between" align="center">
          <Text size={2} weight="bold" style={{ color: '#fff' }}>
            ✨ AI Certificate Auto-Filler (Drag & Drop Supported)
          </Text>
          <Badge tone={isDragging ? 'positive' : 'default'}>
            {isDragging ? 'Drop File Here!' : 'Editable'}
          </Badge>
        </Flex>

        <Text size={1} style={{ color: '#9aa0a6' }}>
          Drag & drop your certificate image anywhere in this box or click to select. It automatically scans and fills Certificate Name, Issued By, Issue Date, Credential ID, and Category!
        </Text>

        {/* Drag & Drop Visual Box */}
        <Box marginTop={2}>
          <label style={{ cursor: isAnalyzing ? 'not-allowed' : 'pointer', display: 'block' }}>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={isAnalyzing}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                borderRadius: '12px',
                backgroundColor: isDragging ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: isDragging ? '2px dashed #22c55e' : '1px dashed rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {isAnalyzing ? (
                <Flex align="center" gap={3}>
                  <Spinner size={2} />
                  <Text size={2} style={{ color: '#22c55e', fontWeight: 600 }}>
                    {progressStatus}
                  </Text>
                </Flex>
              ) : (
                <>
                  <Text size={4} style={{ marginBottom: '8px' }}>
                    {isDragging ? '📥' : '📄'}
                  </Text>
                  <Text size={2} weight="bold" style={{ color: '#fff', marginBottom: '4px' }}>
                    {isDragging ? 'Drop Certificate Image Now' : 'Drag & Drop Certificate Image Here'}
                  </Text>
                  <Text size={1} style={{ color: '#6b7280' }}>
                    or click to browse from your computer (PNG, JPG, WEBP, PDF)
                  </Text>
                </>
              )}
            </div>
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
