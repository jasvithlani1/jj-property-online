export default {
  name: 'servicePage',
  title: 'Service Pages',
  type: 'document',
  orderings: [
    {
      title: 'Display Order (Navbar)',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title or title shown on page.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order in the Studio list. Matches the navbar dropdown: 1 = First Home Buyers, 2 = Property Investors, 3 = SMSF Property, 4 = Commercial Property.',
    },
    {
      name: 'seoModule',
      title: 'SEO Settings',
      type: 'seoModule',
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
      ],
    },
    {
      name: 'intro',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'content', title: 'Content (Rich Text or Text)', type: 'text' },
        {
          name: 'benefits',
          title: 'Benefits List',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'image',
          title: 'Side Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for screen readers and SEO (e.g. "First home buyers reviewing property documents").',
            },
          ],
        },
      ],
    },
    {
      name: 'pillars',
      title: 'Service Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Describe the image for screen readers and SEO.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'process',
      title: 'Acquisition Journey / Process',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Section Heading', type: 'string' },
        { name: 'description', title: 'Section Description', type: 'text' },
        {
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'stepNumber', title: 'Step Number', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'body', title: 'Body Text', type: 'text' },
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      description: 'Describe the image for screen readers and SEO.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'readiness',
      title: 'Readiness / Requirements Roadmap',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'items',
          title: 'Roadmap Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'cta',
          title: 'Bottom CTA Card',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'buttonText', title: 'Button Text', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'whyJJ',
      title: 'Why JJ Property Partner',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'reasons',
          title: 'Reasons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'primaryButtonText', title: 'Primary Button Text', type: 'string' },
        { name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ],
    },
  ],
};
