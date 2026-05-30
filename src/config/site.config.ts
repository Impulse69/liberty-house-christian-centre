/**
 * Static site configuration and resilient fallbacks.
 *
 * Most of this content is also editable in Sanity (siteSettings). These values
 * act as graceful defaults so the chrome (nav, footer, contact) always renders,
 * even before CMS data resolves or if a field is left empty.
 */

export interface NavLink {
  label: string
  to: string
}

export const siteConfig = {
  name: 'Liberty House Christian Centre',
  shortName: 'Liberty House',
  tagline: 'Impacting our generation, giving hope and bringing restoration',
  description:
    'Liberty House Christian Centre is a vibrant family of faith in Tema, Ghana — impacting our generation, giving hope and bringing restoration through worship, the Word and community.',
  domain: 'libertyhousechristiancentre.com',
  url: 'https://libertyhousechristiancentre.com',
  foundedCity: 'Tema',
  country: 'Ghana',
} as const

export const mainNav: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Sermons', to: '/sermons' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav: NavLink[] = [
  { label: 'About the Church', to: '/about' },
  { label: 'Vision & Mission', to: '/vision-mission' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Sermons', to: '/sermons' },
  { label: 'Events & Programs', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Inspirational Quotes', to: '/quotes' },
  { label: 'Give', to: '/give' },
  { label: 'Contact / Visit Us', to: '/contact' },
]

/** Confirmed public contact details. */
export const contactInfo = {
  phones: ['0576643059', '+233 24 385 7575'],
  email: 'lukebarson@gmail.com',
  poBox: 'Post Office Box CO 4959, Tema',
  city: 'Tema',
  region: 'Greater Accra',
  country: 'Ghana',
} as const

export const serviceTimes = [
  { name: 'Sunday Worship', day: 'Sunday', time: '9:00 AM', note: 'Main celebration service' },
  { name: 'Midweek Service', day: 'Wednesday', time: '6:30 PM', note: 'Bible study & prayer' },
] as const

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'whatsapp'
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { platform: 'facebook', label: 'Facebook', href: '#' },
  { platform: 'instagram', label: 'Instagram', href: '#' },
  { platform: 'youtube', label: 'YouTube', href: '#' },
  { platform: 'whatsapp', label: 'WhatsApp', href: '#' },
]
