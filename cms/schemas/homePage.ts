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
      name: 'seoModule',
      title: 'SEO Settings',
      type: 'seoModule',
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'slides',
          title: 'Carousel Slides',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'heroSlide',
              title: 'Slide',
              fields: [
                { name: 'heading', title: 'Heading (HTML allowed)', type: 'text' },
                { name: 'subheading', title: 'Subheading', type: 'text' }
              ],
              preview: {
                select: {
                  title: 'heading',
                  subtitle: 'subheading'
                }
              }
            }
          ]
        },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
      ],
    },
    {
      name: 'servicesPreview',
      title: 'Services Preview Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Section Heading', type: 'string' },
        { name: 'subheading', title: 'Section Subheading', type: 'text' },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
        { name: 'ctaLink', title: 'CTA Button Link', type: 'string', description: 'e.g. /services' },
        {
          name: 'items',
          title: 'Service Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'anchor', title: 'Anchor Link', type: 'string', description: 'e.g. first-home-buyers' },
              ],
              preview: { select: { title: 'title', subtitle: 'anchor' } },
            },
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
        {
          name: 'image',
          title: 'Profile Image',
          type: 'image',
          description: 'Profile photo shown beside the About preview text.',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        },
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
        {
          name: 'collageImages',
          title: 'Photo Collage (4 images)',
          description: 'Exactly 4 images shown in the 2×2 collage grid. Order: top-left (tall), bottom-left (square), top-right (square), bottom-right (tall).',
          type: 'array',
          validation: (Rule: any) => Rule.max(4),
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
            },
          ],
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
    },
    {
      name: 'workHighlightsSection',
      title: 'Work Highlights Section',
      type: 'object',
      description: 'The featured case studies section on the home page ("Real World Results").',
      fields: [
        { name: 'heading', title: 'Section Heading', type: 'string', description: 'e.g. "Real World Results. The JJ Advantage."' },
        { name: 'subheading', title: 'Section Subheading', type: 'text', description: 'Short line shown below the heading.' },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string', description: 'e.g. "All Case Studies"' },
        {
          name: 'items',
          title: 'Featured Case Studies',
          type: 'array',
          description: 'Pick up to 4 case studies to feature. These are displayed as cards on the home page.',
          validation: (Rule: any) => Rule.max(4),
          of: [
            {
              type: 'reference',
              to: [{ type: 'caseStudy' }],
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
  ],
};
