// siteSettings.ts — Singleton document for global SEO and analytics config
// This document is intended to have exactly ONE record in Sanity.

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Icon to distinguish it in the studio
  icon: () => '⚙️',
  fields: [
    // ─── Identity ────────────────────────────────────────────────────────────
    {
      name: 'siteTitle',
      title: 'Site Name',
      type: 'string',
      description: 'Your business name (e.g. JJ Property Partner).',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Your canonical domain (e.g. https://www.jjpropertypartner.com.au).',
      validation: (Rule: any) => Rule.required(),
    },

    // ─── Analytics & Tracking ─────────────────────────────────────────────────
    {
      name: 'analyticsGroup',
      title: 'Analytics & Tracking',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'gtmId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'Format: GTM-XXXXXXX. Leave blank to disable GTM.',
          validation: (Rule: any) =>
            Rule.custom((val: string) => {
              if (!val) return true;
              return /^GTM-[A-Z0-9]+$/.test(val)
                ? true
                : 'Must be in format GTM-XXXXXXX';
            }),
        },
        {
          name: 'gaId',
          title: 'Google Analytics 4 ID',
          type: 'string',
          description: 'Format: G-XXXXXXXXXX. Leave blank to disable GA4.',
          validation: (Rule: any) =>
            Rule.custom((val: string) => {
              if (!val) return true;
              return /^G-[A-Z0-9]+$/.test(val)
                ? true
                : 'Must be in format G-XXXXXXXXXX';
            }),
        },
        {
          name: 'gscCode',
          title: 'Google Search Console Verification Code',
          type: 'string',
          description:
            'The "content" value from your GSC HTML tag verification meta tag.',
        },
      ],
    },

    // ─── Organization Schema (JSON-LD) ────────────────────────────────────────
    {
      name: 'organizationSchema',
      title: 'Organization / Business Schema',
      type: 'object',
      description: 'Used to generate the Organization JSON-LD on every page.',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'type',
          title: 'Schema Type',
          type: 'string',
          options: {
            list: [
              { title: 'Organization', value: 'Organization' },
              { title: 'LocalBusiness', value: 'LocalBusiness' },
              { title: 'RealEstateAgent', value: 'RealEstateAgent' },
            ],
            layout: 'radio',
          },
          initialValue: 'RealEstateAgent',
        },
        {
          name: 'name',
          title: 'Business Name',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Business URL',
          type: 'url',
        },
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'telephone',
          title: 'Phone Number',
          type: 'string',
          description: 'Include country code, e.g. +61412345678',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            { name: 'streetAddress', title: 'Street Address', type: 'string' },
            { name: 'suburb', title: 'Suburb / City', type: 'string' },
            { name: 'state', title: 'State', type: 'string' },
            { name: 'postalCode', title: 'Postal Code', type: 'string' },
            {
              name: 'country',
              title: 'Country',
              type: 'string',
              initialValue: 'AU',
            },
          ],
        },
        {
          name: 'geo',
          title: 'Geographic Coordinates',
          type: 'object',
          fields: [
            { name: 'latitude', title: 'Latitude', type: 'string', description: 'e.g. -33.8688' },
            { name: 'longitude', title: 'Longitude', type: 'string', description: 'e.g. 151.2093' },
          ],
        },
        {
          name: 'sameAs',
          title: 'Social Profiles (sameAs)',
          type: 'array',
          of: [{ type: 'url' }],
          description:
            'Links to your official social media pages (LinkedIn, Facebook, etc.)',
        },
        {
          name: 'openingHours',
          title: 'Opening Hours',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'ISO 8601 format, e.g. "Mo-Fr 09:00-17:00", "Sa 10:00-14:00". Used in LocalBusiness schema.',
        },
        {
          name: 'priceRange',
          title: 'Price Range',
          type: 'string',
          description: 'Dollar signs indicating price tier, e.g. "$$$". Used in LocalBusiness schema.',
          options: {
            list: [
              { title: '$   — Budget', value: '$' },
              { title: '$$  — Moderate', value: '$$' },
              { title: '$$$ — Premium', value: '$$$' },
              { title: '$$$$ — Luxury', value: '$$$$' },
            ],
          },
        },
        {
          name: 'areaServed',
          title: 'Areas Served',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'E.g. Sydney, Melbourne, Brisbane',
        },
      ],
    },

    // ─── Person Schema (JSON-LD) ───────────────────────────────────────────────
    {
      name: 'personSchema',
      title: 'Key Person Schema',
      type: 'object',
      description:
        'Optional. Adds a Person JSON-LD block for the founder/agent.',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'name', title: 'Full Name', type: 'string' },
        { name: 'jobTitle', title: 'Job Title', type: 'string' },
        {
          name: 'image',
          title: 'Profile Photo',
          type: 'image',
          options: { hotspot: true },
        },
        { name: 'url', title: 'Profile Page URL', type: 'url' },
        {
          name: 'sameAs',
          title: 'Social Profiles',
          type: 'array',
          of: [{ type: 'url' }],
        },
      ],
    },

    // ─── Crawl Manager (Robots.txt) ───────────────────────────────────────────
    {
      name: 'robotsDisallow',
      title: 'Crawl Manager (Robots.txt Disallow Rules)',
      description: 'Add paths you want to hide from search engines (e.g. /private, /drafts). Must start with a forward slash (/).',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule: any) =>
            Rule.required().custom((val: string) => {
              if (!val) return true;
              if (!val.startsWith('/')) return 'Path must start with a forward slash (/)';
              if (/\\s/.test(val)) return 'Path cannot contain spaces';
              return true;
            }),
        },
      ],
      initialValue: ['/privacy-policy', '/terms-and-conditions', '/thank-you'],
    },

    // ─── Custom Script Injection ───────────────────────────────────────────────
    // NOTE: These fields use the code input plugin for syntax highlighting.
    // They require the @sanity/code-input plugin to be installed.
    // The content is sanitised on the frontend before injection.
    {
      name: 'customHeaderScripts',
      title: '⚠️ Custom Header Scripts (Advanced)',
      type: 'code',
      description:
        'Raw HTML/JS injected inside <head>. DEVELOPERS ONLY — do not expose to untrusted editors. Validated for XSS before rendering.',
      options: {
        language: 'html',
        languageAlternatives: [
          { title: 'HTML', value: 'html' },
          { title: 'JavaScript', value: 'javascript' },
        ],
        withFilename: false,
      },
    },
    {
      name: 'customFooterScripts',
      title: '⚠️ Custom Footer Scripts (Advanced)',
      type: 'code',
      description:
        'Raw HTML/JS injected at end of <body>. DEVELOPERS ONLY — validated for XSS before rendering.',
      options: {
        language: 'html',
        languageAlternatives: [
          { title: 'HTML', value: 'html' },
          { title: 'JavaScript', value: 'javascript' },
        ],
        withFilename: false,
      },
    },

    // ─── llms.txt Content ─────────────────────────────────────────────────────
    {
      name: 'llmsTxtContent',
      title: 'AI/LLM Context File (llms.txt)',
      type: 'text',
      rows: 12,
      description:
        'Content served at /llms.txt to help AI assistants and LLMs understand your site. Use plain text. See llmstxt.org for the specification.',
    },

    // ─── Default OG Image ─────────────────────────────────────────────────────
    {
      name: 'defaultOgImage',
      title: 'Default Social Sharing Image',
      type: 'image',
      description:
        'Fallback OG image used on any page that does not have its own.',
      options: { hotspot: true },
    },
  ],

  // Enforce a single document pattern via __experimental_actions
  __experimental_actions: ['update', 'publish'],
};
