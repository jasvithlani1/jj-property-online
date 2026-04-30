export default {
  name: 'servicesPage',
  title: 'Services Overview Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        {
          name: 'stats',
          title: 'Stats Strip',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'label', title: 'Label', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'serviceList',
      title: 'Main Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID (slug)', type: 'string' },
            { name: 'tag', title: 'Tag', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'subtitle', title: 'Subtitle', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'benefits',
              title: 'Benefits',
              type: 'array',
              of: [{ type: 'string' }],
            },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'accentClass', title: 'Accent Class (e.g. bg-gold/5)', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'additionalServices',
      title: 'Additional Services (Grid)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon Name (Scale, Gavel, TrendingUp)', type: 'string' },
            { name: 'isFeatured', title: 'Is Featured?', type: 'boolean' },
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
      title: 'Final CTA Bar',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'primaryButtonText', title: 'Primary Button Text', type: 'string' },
      ],
    },
  ],
};
