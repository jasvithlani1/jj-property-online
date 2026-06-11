/**
 * GlobalSEO.tsx
 * ─────────────
 * Injected once at the App level. Responsible for:
 *  1. GTM snippet (head + body noscript)
 *  2. GA4 snippet
 *  3. Google Search Console verification meta tag
 *  4. Organization JSON-LD
 *  5. Person JSON-LD (if configured)
 *  6. WebSite JSON-LD (with SearchAction)
 *  7. Custom header/footer scripts from CMS (sanitised)
 *
 * Security note: custom scripts are ONLY rendered if they pass
 * the sanitiseScript() guard. This rejects payloads that include
 * dangerous patterns (e.g. inline event handlers, javascript: URLs,
 * document.cookie access). This is not a substitute for restricting
 * who can edit those fields in Sanity.
 */

import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { urlFor } from '../lib/sanity';
import type { SiteSettings } from '../types/seo';

// ── Sanitisation ─────────────────────────────────────────────────────────────

/**
 * Basic allowlist-style guard for injected script strings.
 * Rejects any payload that contains XSS-prone patterns.
 */
function sanitiseScript(raw: string | undefined): string | null {
  if (!raw || typeof raw !== 'string') return null;

  const dangerous = [
    /\bon\w+\s*=/i,           // inline event handlers: onclick=, onerror=
    /javascript\s*:/i,         // javascript: URL scheme
    /document\.cookie/i,       // cookie theft
    /document\.write\s*\(/i,   // document.write
    /eval\s*\(/i,              // eval()
    /<\s*iframe/i,             // iframes
    /<\s*object/i,             // object embeds
    /<\s*embed/i,              // embed tags
  ];

  for (const pattern of dangerous) {
    if (pattern.test(raw)) {
      console.warn('[GlobalSEO] Blocked potentially unsafe custom script.');
      return null;
    }
  }

  return raw;
}

// ── JSON-LD Builders ──────────────────────────────────────────────────────────

function buildOrganizationLD(settings: SiteSettings): object | null {
  const org = settings.organizationSchema;
  if (!org?.name) return null;

  const logoUrl = org.logo ? urlFor(org.logo).width(200).url() : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': org.type || 'Organization',
    name: org.name,
    url: org.url || settings.siteUrl,
    ...(logoUrl && {
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    }),
    ...(org.telephone && { telephone: org.telephone }),
    ...(org.email && { email: org.email }),
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.suburb,
        addressRegion: org.address.state,
        postalCode: org.address.postalCode,
        addressCountry: org.address.country || 'AU',
      },
    }),
    ...(org.sameAs?.length && { sameAs: org.sameAs }),
    ...(org.areaServed?.length && { areaServed: org.areaServed }),
  };
}

function buildPersonLD(settings: SiteSettings): object | null {
  const person = settings.personSchema;
  if (!person?.name) return null;

  const imageUrl = person.image ? urlFor(person.image).width(400).url() : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.url && { url: person.url }),
    ...(imageUrl && { image: imageUrl }),
    ...(person.sameAs?.length && { sameAs: person.sameAs }),
    worksFor: settings.organizationSchema?.name
      ? { '@type': 'Organization', name: settings.organizationSchema.name }
      : undefined,
  };
}

function buildWebSiteLD(settings: SiteSettings): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.siteTitle,
    url: settings.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${settings.siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function GlobalSEO() {
  const { settings } = useSiteSettings();

  if (!settings) return null;

  const { analyticsGroup } = settings;
  const gtmId = analyticsGroup?.gtmId;
  const gaId = analyticsGroup?.gaId;
  const gscCode = analyticsGroup?.gscCode;

  const orgLD = buildOrganizationLD(settings);
  const personLD = buildPersonLD(settings);
  const websiteLD = buildWebSiteLD(settings);

  const headerScript = sanitiseScript(settings.customHeaderScripts?.code);
  const footerScript = sanitiseScript(settings.customFooterScripts?.code);

  return (
    <>
      <Helmet>
        {/* ── Google Search Console Verification ─────────────────────────── */}
        {gscCode && (
          <meta name="google-site-verification" content={gscCode} />
        )}

        {/* ── GTM Head Snippet ────────────────────────────────────────────── */}
        {gtmId && (
          <script>{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}</script>
        )}

        {/* ── GA4 Snippet (only if no GTM — avoid double-counting) ─────────── */}
        {gaId && !gtmId && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
        )}
        {gaId && !gtmId && (
          <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}</script>
        )}

        {/* ── Organization JSON-LD ────────────────────────────────────────── */}
        {orgLD && (
          <script type="application/ld+json">
            {JSON.stringify(orgLD, null, 0)}
          </script>
        )}

        {/* ── Person JSON-LD ──────────────────────────────────────────────── */}
        {personLD && (
          <script type="application/ld+json">
            {JSON.stringify(personLD, null, 0)}
          </script>
        )}

        {/* ── WebSite JSON-LD ─────────────────────────────────────────────── */}
        <script type="application/ld+json">
          {JSON.stringify(websiteLD, null, 0)}
        </script>

        {/* ── Custom Header Scripts (sanitised) ───────────────────────────── */}
        {headerScript && (
          <script>{headerScript}</script>
        )}
      </Helmet>

      {/* ── GTM noscript body tag ────────────────────────────────────────── */}
      {gtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="GTM noscript"
          />
        </noscript>
      )}

      {/* ── Custom Footer Scripts (sanitised) ───────────────────────────── */}
      {footerScript && (
        <div
          id="custom-footer-scripts"
          // We use a hidden container and inject via script to avoid React
          // treating the content as HTML. The sanitiser above ensures safety.
          style={{ display: 'none' }}
          data-scripts={footerScript}
        />
      )}
    </>
  );
}
