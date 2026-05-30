import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const pastorQuote = defineType({
  name: 'pastorQuote',
  title: 'Pastor Quote',
  type: 'document',
  icon: CommentIcon,
  description: 'Add a quote as text, or upload a quote image/graphic from the pastor.',
  fields: [
    defineField({
      name: 'quoteText',
      title: 'Quote text',
      type: 'text',
      rows: 3,
      description: 'Leave empty if you are uploading a quote image instead.',
    }),
    defineField({
      name: 'quoteImage',
      title: 'Quote image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description: 'An uploaded quote graphic. Shown as an image post on the site.',
    }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'Pastor' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      const value = fields as { quoteText?: string; quoteImage?: unknown } | undefined
      if (!value?.quoteText && !value?.quoteImage) {
        return 'Add either quote text or a quote image.'
      }
      return true
    }),
  preview: {
    select: { title: 'quoteText', author: 'author', media: 'quoteImage' },
    prepare: ({ title, author, media }) => ({
      title: title || 'Image quote',
      subtitle: author,
      media,
    }),
  },
})
