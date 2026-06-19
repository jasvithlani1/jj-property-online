import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteHeader',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Email address shown in the top header bar (links to mailto:).',
    }),
    defineField({
      name: 'phone',
      title: 'Phone / Call Number',
      type: 'string',
      description: 'Phone number shown in the top header bar (links to tel:). Include country code, e.g. +61 481 334 458.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      description: 'Social media icons shown in the top header bar (right side).',
      of: [
        {
          type: 'object',
          name: 'headerSocialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform Name',
              type: 'string',
              description: 'e.g. Instagram, Facebook',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Select the matching icon for this platform.',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'X / Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                ],
                layout: 'dropdown',
              },
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              description: 'Full URL to your social media profile.',
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Header Settings' }),
  },
});
