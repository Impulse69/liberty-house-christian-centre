import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      title: 'Background image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'ctaLabel', title: 'Button label', type: 'string' }),
    defineField({
      name: 'ctaHref',
      title: 'Button link',
      type: 'string',
      description: 'Internal path (e.g. /contact) or full URL.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only active banners are shown on the site.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
  },
})
