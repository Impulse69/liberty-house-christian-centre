import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'services', title: 'Services & Social' },
    { name: 'giving', title: 'Giving' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Church name',
      type: 'string',
      group: 'general',
      initialValue: 'Liberty House Christian Centre',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
      description: 'Short motto shown across the site.',
    }),
    defineField({
      name: 'mission',
      title: 'Mission statement',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'about',
      title: 'About the church',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'general',
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    }),
    defineField({
      name: 'phones',
      title: 'Phone numbers',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'contact',
    }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({ name: 'poBox', title: 'Postal address', type: 'string', group: 'contact' }),
    defineField({ name: 'address', title: 'Physical address', type: 'text', rows: 2, group: 'contact' }),
    defineField({
      name: 'serviceTimes',
      title: 'Service times',
      type: 'array',
      group: 'services',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'day', title: 'Day', type: 'string' }),
            defineField({ name: 'time', title: 'Time', type: 'string' }),
            defineField({ name: 'note', title: 'Note', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'time' },
          },
        },
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'services',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: ['facebook', 'instagram', 'youtube', 'tiktok', 'whatsapp'],
              },
            }),
            defineField({ name: 'href', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'giving',
      title: 'Giving details',
      type: 'object',
      group: 'giving',
      fields: [
        defineField({ name: 'intro', title: 'Intro text', type: 'text', rows: 2 }),
        defineField({ name: 'bankName', title: 'Bank name', type: 'string' }),
        defineField({ name: 'accountName', title: 'Account name', type: 'string' }),
        defineField({ name: 'accountNumber', title: 'Account number', type: 'string' }),
        defineField({ name: 'momoNumber', title: 'Mobile Money number', type: 'string' }),
        defineField({ name: 'momoName', title: 'Mobile Money name', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
