export default {
  name: 'acquisition',
  title: 'Acquisition',
  type: 'document',
  fields: [
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
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
