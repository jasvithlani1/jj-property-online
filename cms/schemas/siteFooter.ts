import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteFooter',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'string',
      description: 'Displayed under the Address label in the Connect column.',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Displayed under the Email label — used for mailto: link.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp Number',
      type: 'string',
      description: 'Displayed under the Call label — include country code, e.g. +61 481 334 458.',
    }),
    defineField({
      name: 'abn',
      title: 'ABN',
      type: 'string',
      description: 'Australian Business Number displayed in the Connect column.',
    }),
    defineField({
      name: 'reaLicence',
      title: 'REA Licence Number',
      type: 'string',
      description: 'Real estate agent licence number, e.g. No. 20543356.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      description: 'Social icons shown in the "Follow Our Journey" footer row.',
      of: [
        {
          type: 'object',
          name: 'footerSocialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform Name',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
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
    prepare: () => ({ title: 'Footer Settings' }),
  },
});
