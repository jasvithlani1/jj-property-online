export default {
  name: 'acquisition',
  title: 'Acquisition',
  type: 'document',
  preview: {
    select: {
      title: 'city',
      subtitle: 'linkedCaseStudy.caseNumber',
      media: 'image',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? `Linked to Case Study: ${subtitle}` : 'Not linked to a case study',
        media: media,
      };
    },
  },
  fields: [
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'linkedCaseStudy',
      title: 'Linked Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
      description: 'Optional: Link this acquisition to a specific case study.',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dealDone',
      title: 'Deal Done',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'price',
      title: 'Purchase Price',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'config',
      title: 'Configuration (beds / baths / cars)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'month',
      title: 'Purchase Month (e.g. Sep-25)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rental',
      title: 'Market Rent',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Current Value',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'size',
      title: 'Land Size',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'growth',
      title: 'Capital Growth',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'yield',
      title: 'Rental Yield',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Property Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    },
  ],
};
