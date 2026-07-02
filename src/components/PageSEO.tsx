/**
 * PageSEO.tsx
 * ───────────
 * Per-page SEO component. Handles:
 *  1. <title>, <meta description>, <meta robots>, canonical
 *  2. Open Graph + Twitter Card meta tags
 *  3. Breadcrumb schema (for non-home pages)
 *  4. Conditional JSON-LD from seoModule.schemaModules
 *     (FAQ, Review/AggregateRating, Article, Service)
 *
 * Usage:
 *   <PageSEO
 *     title="First Home Buyers Sydney"
 *     description="Expert buyers agent for first home buyers..."
 *     seoModule={pageSeoData}
 *     path="/services/first-home-buyers"
 *     breadcrumbs={[
 *       { name: 'Services', url: '/services' },
 *       { name: 'First Home Buyers', url: '/services/first-home-buyers' }
 *     ]}
 *   />
 */

import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { urlFor } from '../lib/sanity';
import type {
  SeoModule,
  BreadcrumbItem,
  FaqSchema,
  ReviewSchema,
  ArticleSchema,
  ServiceSchema,
} from '../types/seo';

// ── Props ─────────────────────────────────────────────────────────────────────

interface PageSEOProps {
  /** Fallback title (used if seoModule has no metaTitle) */
  title?: string;
  /** Fallback description */
  description?: string;
  /** The seoModule object from Sanity */
  seoModule?: SeoModule;
  /** Relative path for this page, e.g. "/services/first-home-buyers" */
  path?: string;
  /** Breadcrumb trail. Omit or pass [] to suppress BreadcrumbList schema. */
  breadcrumbs?: BreadcrumbItem[];
  /** Article published date (ISO string) — used if no articleSchema module */
  publishedAt?: string;
  /** Manually override noIndex */
  noIndex?: boolean;
  /** og:type value — defaults to "website". Pass "article" for blog posts. */
  type?: string;
}

// ── JSON-LD Builders ──────────────────────────────────────────────────────────

function buildBreadcrumbLD(
  breadcrumbs: BreadcrumbItem[],
  siteUrl: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      ...breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: crumb.name,
        item: crumb.url.startsWith('http')
          ? crumb.url
          : `${siteUrl}${crumb.url}`,
      })),
    ],
  };
}

function buildFaqLD(module: FaqSchema): object | null {
  if (!module.enabled || !module.faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: module.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function buildReviewLD(
  module: ReviewSchema,
  orgName: string,
  siteUrl: string
): object | null {
  if (!module.enabled || !module.ratingValue) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: orgName,
    url: siteUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: module.ratingValue,
      reviewCount: module.ratingCount ?? 1,
      bestRating: module.bestRating ?? 5,
      worstRating: module.worstRating ?? 1,
    },
  };
}

function buildArticleLD(
  module: ArticleSchema,
  props: {
    title?: string;
    description?: string;
    imageUrl?: string;
    siteUrl?: string;
    orgName?: string;
    path?: string;
  }
): object | null {
  if (!module.enabled) return null;
  return {
    '@context': 'https://schema.org',
    '@type': module.articleType || 'Article',
    headline: props.title,
    description: props.description,
    ...(props.imageUrl && { image: props.imageUrl }),
    ...(module.publishedDate && { datePublished: module.publishedDate }),
    ...(module.modifiedDate && { dateModified: module.modifiedDate }),
    author: {
      '@type': 'Person',
      name: module.authorName || 'JJ Property Partner',
    },
    publisher: {
      '@type': 'Organization',
      name: props.orgName || 'JJ Property Partner',
      url: props.siteUrl,
    },
    ...(props.siteUrl &&
      props.path && { url: `${props.siteUrl}${props.path}` }),
  };
}

function buildServiceLD(
  module: ServiceSchema,
  orgName: string,
  siteUrl: string
): object | null {
  if (!module.enabled || !module.serviceName) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: module.serviceName,
    description: module.serviceDescription,
    provider: {
      '@type': 'Organization',
      name: orgName,
      url: siteUrl,
    },
    ...(module.areaServed && { areaServed: module.areaServed }),
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PageSEO({
  title: fallbackTitle,
  description: fallbackDesc,
  seoModule,
  path = '/',
  breadcrumbs = [],
  noIndex: manualNoIndex,
  type = 'website',
}: PageSEOProps) {
  const { settings } = useSiteSettings();

  const siteUrl = settings?.siteUrl || 'https://www.jjpropertypartner.com.au';
  const siteTitle = settings?.siteTitle || 'JJ Property Partner';
  const orgName = settings?.organizationSchema?.name || siteTitle;

  // Resolve final values: seoModule wins over fallback
  const metaTitle = seoModule?.metaTitle || fallbackTitle || siteTitle;
  const metaDesc = seoModule?.metaDescription || fallbackDesc || '';
  const canonicalUrl = seoModule?.canonicalUrl || `${siteUrl}${path}`;
  const noIndex = manualNoIndex ?? seoModule?.noIndex ?? false;

  // OG image: seoModule → siteSettings default
  const ogImageSrc = seoModule?.ogImage
    ? urlFor(seoModule.ogImage).width(1200).height(630).url()
    : settings?.defaultOgImage
    ? urlFor(settings.defaultOgImage).width(1200).height(630).url()
    : undefined;

  // Full page title with site name suffix — skip appending if already present
  const fullTitle =
    metaTitle === siteTitle || metaTitle.endsWith(`| ${siteTitle}`)
      ? metaTitle
      : `${metaTitle} | ${siteTitle}`;

  // Build JSON-LD blocks
  const jsonLdBlocks: object[] = [];

  // Breadcrumbs (skip on home page)
  if (breadcrumbs.length > 0) {
    jsonLdBlocks.push(buildBreadcrumbLD(breadcrumbs, siteUrl));
  }

  // Conditional schema modules
  if (seoModule?.schemaModules) {
    for (const mod of seoModule.schemaModules) {
      switch (mod._type) {
        case 'faqSchema': {
          const ld = buildFaqLD(mod as FaqSchema);
          if (ld) jsonLdBlocks.push(ld);
          break;
        }
        case 'reviewSchema': {
          const ld = buildReviewLD(mod as ReviewSchema, orgName, siteUrl);
          if (ld) jsonLdBlocks.push(ld);
          break;
        }
        case 'articleSchema': {
          const ld = buildArticleLD(mod as ArticleSchema, {
            title: metaTitle,
            description: metaDesc,
            imageUrl: ogImageSrc,
            siteUrl,
            orgName,
            path,
          });
          if (ld) jsonLdBlocks.push(ld);
          break;
        }
        case 'serviceSchema': {
          const ld = buildServiceLD(mod as ServiceSchema, orgName, siteUrl);
          if (ld) jsonLdBlocks.push(ld);
          break;
        }
      }
    }
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ─────────────────────────────────────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_AU" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteTitle} />
      {ogImageSrc && <meta property="og:image" content={ogImageSrc} />}
      {ogImageSrc && <meta property="og:image:secure_url" content={ogImageSrc} />}
      {ogImageSrc && <meta property="og:image:width" content="1200" />}
      {ogImageSrc && <meta property="og:image:height" content="630" />}
      {ogImageSrc && <meta property="og:image:alt" content={fullTitle} />}

      {/* ── Twitter Card ───────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {ogImageSrc && <meta name="twitter:image" content={ogImageSrc} />}

      {/* ── JSON-LD blocks ─────────────────────────────────────────────── */}
      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block, null, 0)}
        </script>
      ))}
    </Helmet>
  );
}
