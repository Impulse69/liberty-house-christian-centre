import { sanityClient } from '@/services/sanity/client'
import type {
  Announcement,
  ChurchEvent,
  GalleryImage,
  HeroBanner,
  Leader,
  PastorQuote,
  Sermon,
  SiteSettings,
} from '@/types/content'
import * as Q from './queries'

/** Typed fetchers. Each returns plain data; React Query handles caching/state. */

export const getSiteSettings = () =>
  sanityClient.fetch<SiteSettings | null>(Q.siteSettingsQuery)

export const getHeroBanners = () => sanityClient.fetch<HeroBanner[]>(Q.heroBannersQuery)

export const getLeaders = () => sanityClient.fetch<Leader[]>(Q.leadersQuery)

export const getFeaturedLeader = () =>
  sanityClient.fetch<Leader | null>(Q.featuredLeaderQuery)

export const getSermons = () => sanityClient.fetch<Sermon[]>(Q.sermonsQuery)

export const getSermonBySlug = (slug: string) =>
  sanityClient.fetch<Sermon | null>(Q.sermonBySlugQuery, { slug })

export const getEvents = () => sanityClient.fetch<ChurchEvent[]>(Q.eventsQuery)

export const getEventBySlug = (slug: string) =>
  sanityClient.fetch<ChurchEvent | null>(Q.eventBySlugQuery, { slug })

export const getQuotes = () => sanityClient.fetch<PastorQuote[]>(Q.quotesQuery)

export const getGallery = () => sanityClient.fetch<GalleryImage[]>(Q.galleryQuery)

export const getAnnouncements = () =>
  sanityClient.fetch<Announcement[]>(Q.announcementsQuery)
