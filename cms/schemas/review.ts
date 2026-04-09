export default {
  name: 'review',
  title: 'Google Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Reviewer Name',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Review Text',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'date',
      title: 'Review Date (Relative, e.g., "2 weeks ago")',
      type: 'string',
    },
    {
      name: 'authorImage',
      title: 'Author Image URL',
      type: 'url',
    },
    {
      name: 'isFeatured',
      title: 'Featured Review',
      type: 'boolean',
      initialValue: true,
    },
    {
        name: 'order',
        title: 'Display Order',
        type: 'number',
    }
  ],
};
