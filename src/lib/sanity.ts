import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '7c1xj4wj',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-03-12',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Client for writing data (requires a token with write access)
export const writeClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '7c1xj4wj',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Don't use CDN for writes
  apiVersion: '2024-03-12',
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN, // You must add this to your .env
});
