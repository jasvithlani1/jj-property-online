import type { SanityImageSource } from '@sanity/image-url';

/**
 * Sanity image reference with optional fields our GROQ queries project.
 * The `isLocal` flag marks images built from local fallback data files.
 * Cast to `SanityImageSource` when passing to `urlFor()`.
 */
export interface SanityImage {
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  isLocal?: boolean;
}

export type { SanityImageSource };
