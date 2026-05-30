/** Formatting helpers for dates coming from Sanity (ISO strings). */

const DEFAULT_LOCALE = 'en-GB'

export function formatDate(value?: string): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(DEFAULT_LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateTime(value?: string): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleString(DEFAULT_LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function formatTime(value?: string): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleTimeString(DEFAULT_LOCALE, { hour: 'numeric', minute: '2-digit' })
}

/** Split an ISO date into compact day/month parts for an event "date chip". */
export function dateParts(value?: string): { day: string; month: string } | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return {
    day: date.toLocaleDateString(DEFAULT_LOCALE, { day: '2-digit' }),
    month: date.toLocaleDateString(DEFAULT_LOCALE, { month: 'short' }).toUpperCase(),
  }
}

export function isUpcoming(value?: string): boolean {
  if (!value) return false
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false
  // Treat events as upcoming until the end of their day.
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)
  return endOfDay.getTime() >= Date.now()
}
