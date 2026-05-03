export default {
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title',
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
        { name: 'badge', title: 'Top Badge', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        { name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } },
        { name: 'missionBadge', title: 'Mission Badge Text', type: 'text' },
      ],
    },
    {
      name: 'profile',
      title: 'Founder Profile Section',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'quote', title: 'Quote', type: 'text' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'image', title: 'Profile Image', type: 'image', options: { hotspot: true } },
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'value', title: 'Value', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'purpose',
      title: 'Purpose Section (JJ Initials)',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
      ],
    },
    {
      name: 'trackRecord',
      title: 'Track Record Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'content', title: 'Content', type: 'text' },
      ],
    },
    {
      name: 'techAdvantage',
      title: 'Technology Advantage Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'content', title: 'Content', type: 'text' },
      ],
    },
    {
      name: 'values',
      title: 'Core Values',
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
      name: 'pillarsSection',
      title: 'Pillars Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        {
          name: 'pillars',
          title: 'Pillars',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'text', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
