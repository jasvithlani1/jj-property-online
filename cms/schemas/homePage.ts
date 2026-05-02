export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Used for internal identification in Sanity.',
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
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
      ],
    },
    {
      name: 'servicesPreview',
      title: 'Services Preview',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'anchor', title: 'Anchor Link', type: 'string' },
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
      name: 'aboutPreview',
      title: 'About Preview Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
      ],
    },
    {
      name: 'differenceSection',
      title: 'Difference Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        { 
          name: 'points', 
          title: 'Bullet Points', 
          type: 'array', 
          of: [{ type: 'string' }] 
        },
      ],
    },
    {
      name: 'processSection',
      title: 'Process Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        {
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Step Title', type: 'string' },
                { name: 'desc', title: 'Description', type: 'text' },
              ]
            }
          ]
        }
      ]
    }
  ],
};
