import { defineField, defineType } from 'sanity'
import { BellIcon } from '@sanity/icons'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'body', title: 'Message', type: 'text', rows: 3 }),
    defineField({ name: 'link', title: 'Link', type: 'url' }),
    defineField({
      name: 'startDate',
      title: 'Show from',
      type: 'date',
      description: 'Optional. Announcement shows on/after this date.',
    }),
    defineField({
      name: 'endDate',
      title: 'Show until',
      type: 'date',
      description: 'Optional. Announcement hides after this date.',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'High', value: 'high' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'priority' },
  },
})
