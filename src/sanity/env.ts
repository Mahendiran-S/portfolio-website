export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Use env var or fallback placeholder ID so sanityClient creation doesn't throw during build
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';

export const useCdn = false;
