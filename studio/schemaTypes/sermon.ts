import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const sermon = defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  icon: PlayIcon,
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
    defineField({ name: 'speaker', title: 'Speaker', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({
      name: 'scripture',
      title: 'Scripture reference',
      type: 'string',
      description: 'e.g. John 3:16–17',
    }),
    defineField({ name: 'series', title: 'Series', type: 'string' }),
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Audio', value: 'audio' },
          { title: 'Text / Notes', value: 'text' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo link.',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3 }),
    defineField({
      name: 'body',
      title: 'Notes / transcript',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'speaker', media: 'thumbnail' },
  },
})
