export default {
  name: 'caseStudiesPage',
  title: 'Case Studies Overview Page',
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
          title: 'Summary Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'icon', title: 'Icon (e.g. Star)', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
