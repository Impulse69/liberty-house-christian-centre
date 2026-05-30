import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category / album',
      type: 'string',
      description: 'e.g. Sunday Service, Conference, Outreach',
    }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'caption', subtitle: 'category', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Untitled photo',
      subtitle,
      media,
    }),
  },
})
