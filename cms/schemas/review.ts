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
      title: 'Review Date',
      type: 'date',
      description: 'Select the actual date of the review. The website will automatically display it as "X weeks ago", "X months ago", etc.',
      options: { dateFormat: 'YYYY-MM-DD' },
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
