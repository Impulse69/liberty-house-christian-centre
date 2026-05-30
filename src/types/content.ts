/**
 * TypeScript shapes for content fetched from Sanity.
 * These mirror the schemas defined in /studio/schemaTypes.
 */

/** Portable Text array — rendered by PortableTextRenderer. Shape is owned by Sanity. */
export type RichText = unknown

export interface SanityImageRef {
  _type?: string
  asset?: {
    _ref?: string
    _type?: string
  }
  alt?: string
  caption?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  /** Low-quality image placeholder (base64) for blur-up, projected from asset metadata. */
  lqip?: string
  dimensions?: { width: number; height: number; aspectRatio: number }
}

export interface SanitySlug {
  current: string
}

export interface HeroBanner {
  _id: string
  title: string
  subtitle?: string
  image?: SanityImageRef
  ctaLabel?: string
  ctaHref?: string
  order?: number
}

export interface Leader {
  _id: string
  name: string
  role: string
  photo?: SanityImageRef
  bio?: RichText
  email?: string
  order?: number
  featured?: boolean
  socials?: { platform: string; href: string }[]
}

export interface Sermon {
  _id: string
  title: string
  slug?: SanitySlug
  speaker?: string
  date?: string
  scripture?: string
  series?: string
  mediaType?: 'video' | 'audio' | 'text'
  videoUrl?: string
  thumbnail?: SanityImageRef
  summary?: string
  body?: RichText
  tags?: string[]
}

export interface ChurchEvent {
  _id: string
  title: string
  slug?: SanitySlug
  startAt?: string
  endAt?: string
  location?: string
  category?: string
  image?: SanityImageRef
  summary?: string
  body?: RichText
  registrationLink?: string
  featured?: boolean
}

export interface PastorQuote {
  _id: string
  quoteText?: string
  quoteImage?: SanityImageRef
  author?: string
  caption?: string
  date?: string
  featured?: boolean
}

export interface GalleryImage {
  _id: string
  image: SanityImageRef
  caption?: string
  category?: string
  date?: string
  order?: number
}

export interface Announcement {
  _id: string
  title: string
  body?: string
  link?: string
  startDate?: string
  endDate?: string
  priority?: 'normal' | 'high'
}

export interface SiteSettings {
  _id: string
  title?: string
  tagline?: string
  about?: RichText
  mission?: string
  vision?: RichText
  logo?: SanityImageRef
  phones?: string[]
  email?: string
  poBox?: string
  address?: string
  serviceTimes?: { name: string; day: string; time: string; note?: string }[]
  socials?: { platform: string; href: string }[]
  giving?: {
    intro?: string
    bankName?: string
    accountName?: string
    accountNumber?: string
    momoNumber?: string
    momoName?: string
  }
}
