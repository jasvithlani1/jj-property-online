import seo from './seo';

export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
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
      name: 'resultText',
      title: 'Short Result Text',
      type: 'string',
      description: 'Example: "$2.4M Investment" or "Off-Market Terrace"',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Example: "Parramatta, NSW"',
    },
    {
      name: 'caseNumber',
      title: 'Case Number',
      type: 'string',
      description: 'Example: "01 of 22"',
    },
    {
      name: 'tag',
      title: 'Tag / Label',
      type: 'string',
      description: 'Example: "Owner Occupied — Home Buyer"',
    },
    {
      name: 'tagColor',
      title: 'Tag Color Class',
      type: 'string',
      description: 'CSS class for tag. Example: "bg-gold text-white shadow-lg shadow-gold/20 font-black"',
    },
    {
      name: 'propertyDetails',
      title: 'Property Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    },
    {
      name: 'strategicAdvantages',
      title: 'Strategic Advantages Delivered',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'desc', type: 'text', title: 'Description' },
          ],
        },
      ],
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required for SEO and accessibility.',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'dealDone',
      title: 'Show "DEAL DONE" Label',
      type: 'boolean',
      description: 'Toggle this to display the DEAL DONE label on the property card.',
      initialValue: false,
    },
    {
      name: 'client',
      title: 'Client Profile',
      type: 'text',
      rows: 3,
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 5,
    },
    {
      name: 'strategy',
      title: 'Our Strategy',
      type: 'text',
      rows: 5,
    },
    {
      name: 'outcome',
      title: 'The Outcome',
      type: 'text',
      rows: 5,
    },
    {
      name: 'shortQuote',
      title: 'Client Quote',
      type: 'string',
    },
    {
      name: 'stats',
      title: 'Key Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label (e.g. Purchase Price)' },
            { name: 'value', type: 'string', title: 'Value (e.g. $2.4M)' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
};
