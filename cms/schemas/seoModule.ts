// seoModule.ts — Reusable SEO object to embed in every page document
// Add as `type: 'seoModule'` to homePage, servicePage, post, etc.

export default {
  name: 'seoModule',
  title: 'SEO & Schema Modules',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    // ─── Standard Meta ────────────────────────────────────────────────────────
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Page title shown on Google. Aim for 50–60 characters.',
      validation: (Rule: any) =>
        Rule.max(60).warning('Titles above 60 characters may be truncated in search results.'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary shown in search results. Aim for 140–160 characters.',
      validation: (Rule: any) =>
        Rule.max(160).warning('Descriptions above 160 characters may be truncated.'),
    },
    {
      name: 'ogImage',
      title: 'Social Sharing Image (OG Image)',
      type: 'image',
      description:
        'Image shown when shared on LinkedIn, Facebook, WhatsApp. Recommended: 1200×630px.',
      options: { hotspot: true },
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Only set this if the page has a duplicate at another URL. Usually leave blank.',
    },
    {
      name: 'noIndex',
      title: 'Hide from Search Engines (noindex)',
      type: 'boolean',
      description: 'Turn ON to prevent Google from indexing this page (e.g. thank-you pages).',
      initialValue: false,
    },

    // ─── Schema Modules ───────────────────────────────────────────────────────
    {
      name: 'schemaModules',
      title: 'Structured Data Modules (JSON-LD)',
      description:
        'Toggle on any schema types that apply to this page. Only enabled modules will be rendered.',
      type: 'array',
      of: [
        // ── FAQ Schema ───────────────────────────────────────────────────────
        {
          type: 'object',
          name: 'faqSchema',
          title: 'FAQ Schema',
          fields: [
            {
              name: 'enabled',
              title: 'Enable FAQ Schema',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'faqs',
              title: 'FAQ Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'faqItem',
                  fields: [
                    {
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'answer',
                      title: 'Answer',
                      type: 'text',
                      rows: 4,
                      validation: (Rule: any) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: { title: 'question', subtitle: 'answer' },
                  },
                },
              ],
            },
          ],
          preview: {
            prepare: () => ({ title: '❓ FAQ Schema' }),
          },
        },

        // ── Review / AggregateRating Schema ──────────────────────────────────
        {
          type: 'object',
          name: 'reviewSchema',
          title: 'Review / Rating Schema',
          fields: [
            {
              name: 'enabled',
              title: 'Enable Review Schema',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'ratingValue',
              title: 'Average Rating',
              type: 'number',
              description: 'e.g. 4.9',
              validation: (Rule: any) => Rule.min(0).max(5),
            },
            {
              name: 'ratingCount',
              title: 'Review Count',
              type: 'number',
              description: 'Total number of reviews.',
              validation: (Rule: any) => Rule.min(0).integer(),
            },
            {
              name: 'bestRating',
              title: 'Best Possible Rating',
              type: 'number',
              initialValue: 5,
            },
            {
              name: 'worstRating',
              title: 'Worst Possible Rating',
              type: 'number',
              initialValue: 1,
            },
          ],
          preview: {
            select: {
              rating: 'ratingValue',
              count: 'ratingCount',
            },
            prepare: ({ rating, count }: any) => ({
              title: `⭐ Review Schema — ${rating ?? '?'}★ (${count ?? '?'} reviews)`,
            }),
          },
        },

        // ── Article Schema ────────────────────────────────────────────────────
        {
          type: 'object',
          name: 'articleSchema',
          title: 'Article Schema',
          fields: [
            {
              name: 'enabled',
              title: 'Enable Article Schema',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'articleType',
              title: 'Article Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Article', value: 'Article' },
                  { title: 'NewsArticle', value: 'NewsArticle' },
                  { title: 'BlogPosting', value: 'BlogPosting' },
                ],
                layout: 'radio',
              },
              initialValue: 'BlogPosting',
            },
            {
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              description: 'Leave blank to inherit from the site Person schema.',
            },
            {
              name: 'publishedDate',
              title: 'Published Date',
              type: 'datetime',
            },
            {
              name: 'modifiedDate',
              title: 'Last Modified Date',
              type: 'datetime',
            },
          ],
          preview: {
            select: { articleType: 'articleType' },
            prepare: ({ articleType }: any) => ({
              title: `📰 Article Schema (${articleType ?? 'Article'})`,
            }),
          },
        },

        // ── Service Schema ────────────────────────────────────────────────────
        {
          type: 'object',
          name: 'serviceSchema',
          title: 'Service Schema',
          fields: [
            {
              name: 'enabled',
              title: 'Enable Service Schema',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'serviceName',
              title: 'Service Name',
              type: 'string',
              description: 'e.g. Buyers Agent Sydney',
            },
            {
              name: 'serviceDescription',
              title: 'Service Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'areaServed',
              title: 'Area Served',
              type: 'string',
              description: 'e.g. Sydney, NSW, Australia',
            },
          ],
          preview: {
            select: { serviceName: 'serviceName' },
            prepare: ({ serviceName }: any) => ({
              title: `🛠 Service Schema — ${serviceName ?? 'Unnamed'}`,
            }),
          },
        },
      ],
    },
  ],
};
