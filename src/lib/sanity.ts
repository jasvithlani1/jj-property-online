import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

if (import.meta.env.DEV && !import.meta.env.VITE_SANITY_PROJECT_ID) {
  console.warn('[sanity] VITE_SANITY_PROJECT_ID not set in .env — falling back to hardcoded project ID');
}

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '7c1xj4wj',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
