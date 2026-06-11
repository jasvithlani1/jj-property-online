export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title',
      type: 'string',
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
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
      ],
    },
    {
      name: 'details',
      title: 'Contact Details',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'email', title: 'Email Address', type: 'string' },
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp Link', type: 'string' },
        { name: 'address', title: 'Office Address', type: 'string' },
      ],
    },
  ],
};
