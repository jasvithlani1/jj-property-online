// src/types/seo.ts — TypeScript types for the SEO system

export interface SeoModule {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noIndex?: boolean;
  schemaModules?: SchemaModule[];
}

export type SchemaModule = FaqSchema | ReviewSchema | ArticleSchema | ServiceSchema;

export interface FaqSchema {
  _type: 'faqSchema';
  enabled: boolean;
  faqs?: { _key: string; question: string; answer: string }[];
}

export interface ReviewSchema {
  _type: 'reviewSchema';
  enabled: boolean;
  ratingValue?: number;
  ratingCount?: number;
  bestRating?: number;
  worstRating?: number;
}

export interface ArticleSchema {
  _type: 'articleSchema';
  enabled: boolean;
  articleType?: 'Article' | 'NewsArticle' | 'BlogPosting';
  authorName?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export interface ServiceSchema {
  _type: 'serviceSchema';
  enabled: boolean;
  serviceName?: string;
  serviceDescription?: string;
  areaServed?: string;
}

export interface SanityImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number };
}

export interface SiteSettings {
  siteTitle: string;
  siteUrl: string;
  analyticsGroup?: {
    gtmId?: string;
    gaId?: string;
    gscCode?: string;
  };
  organizationSchema?: {
    type?: string;
    name?: string;
    url?: string;
    logo?: SanityImage;
    telephone?: string;
    email?: string;
    address?: {
      streetAddress?: string;
      suburb?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
    sameAs?: string[];
    areaServed?: string[];
  };
  personSchema?: {
    name?: string;
    jobTitle?: string;
    image?: SanityImage;
    url?: string;
    sameAs?: string[];
  };
  customHeaderScripts?: { code: string };
  customFooterScripts?: { code: string };
  llmsTxtContent?: string;
  defaultOgImage?: SanityImage;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
