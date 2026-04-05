export default {
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'The title displayed on Google and social media (limit to 60 characters).',
      validation: (Rule: any) => Rule.max(60).warning('Titles above 60 chars may be cut off.'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'The snippet displayed under the title in search results (limit to 160 characters).',
      validation: (Rule: any) => Rule.max(160).warning('Descriptions above 160 chars may be cut off.'),
    },
    {
      name: 'ogImage',
      title: 'Social Sharing Image (OG Image)',
      type: 'image',
      description: 'The image shown when the link is shared on LinkedIn, Facebook, or WhatsApp.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Comma separated keywords (e.g. Sydney Buyers Agent, Parramatta Property).',
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The primary URL if this content exists elsewhere (usually leave blank).',
    },
  ],
};
