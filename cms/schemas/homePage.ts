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
      title: 'WORK HIGHLIGHTS Section',
      type: 'object',
      description: 'The "WORK HIGHLIGHTS" section shown between the Trusted By section and reviews.',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Label', type: 'string', description: 'e.g. "WORK HIGHLIGHTS"' },
        { name: 'heading', title: 'Section Heading', type: 'string' },
        { name: 'subheading', title: 'Section Subheading', type: 'text' },
        {
          name: 'items',
          title: 'Work Highlight Items',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'workHighlightItem',
              title: 'Highlight Item',
              fields: [
                { name: 'title', title: 'Project Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'result', title: 'Result / Outcome', type: 'string', description: 'e.g. "Secured 12% Under Asking"' },
                { name: 'location', title: 'Location', type: 'string' },
                { name: 'tag', title: 'Category Tag', type: 'string', description: 'e.g. "First Home Buyer"' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'result' }
              }
            }
          ]
        }
      ]
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
