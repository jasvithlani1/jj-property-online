#!/usr/bin/env node
/**
 * generate-sitemap.cjs
 * ─────────────────────
 * Fetches all published pages from Sanity and generates:
 *   - dist/sitemap.xml
 *   - dist/robots.txt
 *   - dist/llms.txt
 *
 * Run this AFTER `npm run build` as a post-build step.
 * Add to package.json scripts:
 *   "postbuild": "node generate-sitemap.cjs"
 *
 * Or run manually: node generate-sitemap.cjs
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://www.jjpropertypartner.com.au';
const SANITY_PROJECT_ID = '7c1xj4wj';
const SANITY_DATASET = 'production';

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-03-12',
});

// ── Static pages ──────────────────────────────────────────────────────────────

const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/services', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/first-home-buyers', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/property-investors', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/smsf-property', priority: '0.8', changefreq: 'monthly' },
  { url: '/services/commercial-property', priority: '0.8', changefreq: 'monthly' },
  { url: '/case-studies', priority: '0.8', changefreq: 'weekly' },
  { url: '/blog', priority: '0.8', changefreq: 'daily' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
];

const EXCLUDED_PAGES = ['/privacy-policy', '/terms-and-conditions'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function toW3CDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  return new Date(dateStr).toISOString().split('T')[0];
}

function xmlEscape(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function generate() {
  console.log('🗺  Generating sitemap from Sanity...');

  // Fetch dynamic pages
  const [servicePages, posts, caseStudies, siteSettings] = await Promise.all([
    client.fetch(`*[_type == "servicePage" && defined(slug.current)] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "caseStudy" && defined(slug.current)] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0] { llmsTxtContent, robotsDisallow }`),
  ]);

  const today = new Date().toISOString().split('T')[0];

  // Build all URL entries
  const entries = [
    // Static pages
    ...STATIC_PAGES.map(p => ({
      loc: `${SITE_URL}${p.url}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority,
    })),
    // Dynamic service pages (from CMS, if any override slugs)
    ...servicePages.map(p => ({
      loc: `${SITE_URL}/services/${p.slug}`,
      lastmod: toW3CDate(p._updatedAt),
      changefreq: 'monthly',
      priority: '0.8',
    })),
    // Blog posts
    ...posts.map(p => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: toW3CDate(p._updatedAt),
      changefreq: 'monthly',
      priority: '0.7',
    })),
    // Case studies
    ...caseStudies.map(p => ({
      loc: `${SITE_URL}/case-studies/${p.slug}`,
      lastmod: toW3CDate(p._updatedAt),
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  // ── sitemap.xml ────────────────────────────────────────────────────────────

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.map(e => `  <url>
    <loc>${xmlEscape(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const distDir = path.join(__dirname, 'dist');
  const publicDir = path.join(__dirname, 'public');

  // Write to both dist/ (production) and public/ (dev server)
  [distDir, publicDir].forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, 'sitemap.xml'), xml, 'utf-8');
    }
  });
  console.log(`✓ sitemap.xml — ${entries.length} URLs`);

  // ── robots.txt ────────────────────────────────────────────────────────────

  const robotsDisallowList = siteSettings?.robotsDisallow || ['/privacy-policy', '/terms-and-conditions', '/thank-you'];
  const disallowDirectives = robotsDisallowList.map(path => `Disallow: ${path}`).join('\n');

  const robots = `# robots.txt — JJ Property Partner
# Generated: ${today}

User-agent: *
Allow: /

# Disallow private / utility pages
${disallowDirectives}

# Crawl delay for well-behaved bots
Crawl-delay: 10

# AI / LLM training opt-out
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# LLM context file
LLMs-txt: ${SITE_URL}/llms.txt
`;

  [distDir, publicDir].forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, 'robots.txt'), robots, 'utf-8');
    }
  });
  console.log(`✓ robots.txt`);

  // ── llms.txt ──────────────────────────────────────────────────────────────

  const llmsContent = siteSettings?.llmsTxtContent || `# JJ Property Partner — AI Context File
# ${SITE_URL}/llms.txt
# Specification: https://llmstxt.org

# About
JJ Property Partner is an independent buyer's agency based in Parramatta, Sydney, Australia.
We exclusively represent property buyers (never sellers) across residential, SMSF, and commercial property markets.

# Core Services
- First Home Buyers: Guidance from pre-approval to settlement
- Property Investors: Data-led acquisitions for yield and capital growth
- SMSF Property: Compliant investment-grade acquisitions within Self-Managed Super Funds
- Commercial Property: High-yield commercial asset identification and negotiation

# Locations Served
Sydney, Parramatta, Melbourne, Brisbane, Adelaide, Perth, and select regional markets across Australia.

# Contact
Website: ${SITE_URL}
Book a consultation: ${SITE_URL}/contact

# Content Usage Policy
This file is provided for AI assistants to accurately represent our services.
Please do not use this content to train models without written permission.
`;

  [distDir, publicDir].forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, 'llms.txt'), llmsContent, 'utf-8');
    }
  });
  console.log(`✓ llms.txt`);

  console.log('\n✅ All files generated successfully!');
}

generate().catch(err => {
  console.error('❌ Error generating sitemap:', err.message);
  process.exit(1);
});
