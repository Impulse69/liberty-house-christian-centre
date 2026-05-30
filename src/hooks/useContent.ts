import { useQuery } from '@tanstack/react-query'
import * as api from '@/cms/api'

/** Centralised React Query keys for cache consistency. */
export const queryKeys = {
  siteSettings: ['siteSettings'] as const,
  heroBanners: ['heroBanners'] as const,
  leaders: ['leaders'] as const,
  featuredLeader: ['featuredLeader'] as const,
  sermons: ['sermons'] as const,
  sermon: (slug: string) => ['sermon', slug] as const,
  events: ['events'] as const,
  event: (slug: string) => ['event', slug] as const,
  quotes: ['quotes'] as const,
  gallery: ['gallery'] as const,
  announcements: ['announcements'] as const,
}

export const useSiteSettings = () =>
  useQuery({ queryKey: queryKeys.siteSettings, queryFn: api.getSiteSettings })

export const useHeroBanners = () =>
  useQuery({ queryKey: queryKeys.heroBanners, queryFn: api.getHeroBanners })

export const useLeaders = () => useQuery({ queryKey: queryKeys.leaders, queryFn: api.getLeaders })

export const useFeaturedLeader = () =>
  useQuery({ queryKey: queryKeys.featuredLeader, queryFn: api.getFeaturedLeader })

export const useSermons = () => useQuery({ queryKey: queryKeys.sermons, queryFn: api.getSermons })

export const useSermon = (slug?: string) =>
  useQuery({
    queryKey: queryKeys.sermon(slug ?? ''),
    queryFn: () => api.getSermonBySlug(slug as string),
    enabled: Boolean(slug),
  })

export const useEvents = () => useQuery({ queryKey: queryKeys.events, queryFn: api.getEvents })

export const useEvent = (slug?: string) =>
  useQuery({
    queryKey: queryKeys.event(slug ?? ''),
    queryFn: () => api.getEventBySlug(slug as string),
    enabled: Boolean(slug),
  })

export const useQuotes = () => useQuery({ queryKey: queryKeys.quotes, queryFn: api.getQuotes })

export const useGallery = () => useQuery({ queryKey: queryKeys.gallery, queryFn: api.getGallery })

export const useAnnouncements = () =>
  useQuery({ queryKey: queryKeys.announcements, queryFn: api.getAnnouncements })
