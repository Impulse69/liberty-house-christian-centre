import { useSiteSettings } from './useContent'
import {
  contactInfo,
  serviceTimes as defaultServiceTimes,
  socialLinks as defaultSocials,
  siteConfig,
} from '@/config/site.config'
import type { SanityImageRef } from '@/types/content'

export interface ResolvedSocial {
  platform: string
  href: string
  label: string
}

export interface ResolvedServiceTime {
  name: string
  day: string
  time: string
  note?: string
}

const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
}

export interface SiteData {
  logo?: SanityImageRef
  favicon?: SanityImageRef
  tagline: string
  phones: string[]
  email: string
  poBox: string
  city: string
  country: string
  serviceTimes: ResolvedServiceTime[]
  socials: ResolvedSocial[]
}

/**
 * Resolves editable site details from Sanity (siteSettings), falling back to
 * the static config so the chrome always renders sensible values.
 */
export function useSiteData(): SiteData {
  const { data } = useSiteSettings()

  const phones = data?.phones?.length ? data.phones : [...contactInfo.phones]

  const serviceTimes: ResolvedServiceTime[] = data?.serviceTimes?.length
    ? data.serviceTimes
    : defaultServiceTimes.map((s) => ({ name: s.name, day: s.day, time: s.time, note: s.note }))

  const rawSocials = data?.socials?.length ? data.socials : defaultSocials
  const socials: ResolvedSocial[] = rawSocials
    .filter((s) => Boolean(s.platform) && Boolean(s.href))
    .map((s) => ({
      platform: s.platform,
      href: s.href,
      label: SOCIAL_LABELS[s.platform.toLowerCase()] ?? s.platform,
    }))

  return {
    logo: data?.logo,
    favicon: data?.favicon,
    tagline: data?.tagline || siteConfig.tagline,
    phones,
    email: data?.email || contactInfo.email,
    poBox: data?.poBox || contactInfo.poBox,
    city: contactInfo.city,
    country: contactInfo.country,
    serviceTimes,
    socials,
  }
}
