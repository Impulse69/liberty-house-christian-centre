import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startAt',
      title: 'Starts',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'endAt', title: 'Ends', type: 'datetime' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Conference, Outreach, Service',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3 }),
    defineField({
      name: 'body',
      title: 'Full description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'registrationLink', title: 'Registration / RSVP link', type: 'url' }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Start date',
      name: 'startAsc',
      by: [{ field: 'startAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'startAt', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? new Date(subtitle).toLocaleString() : 'No date',
      media,
    }),
  },
})
