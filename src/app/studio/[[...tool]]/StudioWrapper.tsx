'use client';

import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0e0e10',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '14px',
        }}
      >
        Loading Sanity Studio...
      </div>
    ),
  }
);

export default function StudioWrapper() {
  return <NextStudio config={config} />;
}
