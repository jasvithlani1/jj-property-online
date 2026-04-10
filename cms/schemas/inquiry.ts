export default {
  name: 'inquiry',
  title: 'Inquiries',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'goal',
      title: 'Purchasing Goal',
      type: 'string',
      options: {
        list: [
          { title: 'Owner Occupier / First Home', value: 'owner-occupier' },
          { title: 'Investment Property', value: 'investment' },
          { title: 'SMSF Acquisition', value: 'smsf' },
        ]
      }
    },
    {
      name: 'message',
      title: 'Brief Overview',
      type: 'text',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Archived', value: 'archived' },
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    }
  }
}
