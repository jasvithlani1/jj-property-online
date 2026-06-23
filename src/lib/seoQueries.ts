// src/lib/seoQueries.ts — GROQ queries for the SEO system

// Fetch the singleton siteSettings document
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteTitle,
    siteUrl,
    analyticsGroup {
      gtmId,
      gaId,
      gscCode
    },
    organizationSchema {
      type,
      name,
      url,
      logo { asset },
      telephone,
      email,
      address {
        streetAddress,
        suburb,
        state,
        postalCode,
        country
      },
      geo {
        latitude,
        longitude
      },
      openingHours,
      priceRange,
      sameAs,
      areaServed
    },
    personSchema {
      name,
      jobTitle,
      image { asset },
      url,
      sameAs
    },
    customHeaderScripts { code },
    customFooterScripts { code },
    llmsTxtContent,
    defaultOgImage { asset }
  }
`;

// Fragment for page-level seoModule (include in any page query)
export const SEO_MODULE_FRAGMENT = `
  seoModule {
    metaTitle,
    metaDescription,
    ogImage { asset, hotspot },
    canonicalUrl,
    noIndex,
    schemaModules[] {
      _type,
      enabled,
      _type == "faqSchema" => {
        faqs[] {
          _key,
          question,
          answer
        }
      },
      _type == "reviewSchema" => {
        ratingValue,
        ratingCount,
        bestRating,
        worstRating
      },
      _type == "articleSchema" => {
        articleType,
        authorName,
        publishedDate,
        modifiedDate
      },
      _type == "serviceSchema" => {
        serviceName,
        serviceDescription,
        areaServed
      }
    }
  }
`;

// Sitemap: all published pages
export const SITEMAP_QUERY = `
  {
    "servicePages": *[_type == "servicePage" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    },
    "posts": *[_type == "post" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    },
    "caseStudies": *[_type == "caseStudy" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  }
`;
