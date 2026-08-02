import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from './env';

/**
 * Primary Sanity client — used for all server-side data fetching.
 * Cache tags in fetch calls allow webhook-based on-demand revalidation.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
  stega: { enabled: false },
});

/**
 * Preview client — used for draft content preview (optional).
 * Requires SANITY_API_READ_TOKEN environment variable.
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
  stega: { enabled: false },
});
