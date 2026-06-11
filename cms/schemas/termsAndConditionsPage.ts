export default {
  name: 'termsAndConditionsPage',
  title: 'Terms & Conditions Page',
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
      name: 'sections',
      title: 'Legal Sections',
      type: 'array',
      description: 'The main content clauses of the document.',
      of: [{ type: 'legalSection' }],
    },
  ],
};
