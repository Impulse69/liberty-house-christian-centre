import { useEffect } from 'react'
import { siteConfig } from '@/config/site.config'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown>
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Head/meta manager (no external dependency). Updates title, description,
 * Open Graph, canonical and optional JSON-LD structured data per route.
 */
export function SEO({ title, description, path = '/', image, type = 'website', jsonLd }: SEOProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.shortName}` : `${siteConfig.name} | Tema, Ghana`
    const desc = description ?? siteConfig.description
    const url = `${siteConfig.url}${path}`
    const img = image ?? `${siteConfig.url}/og-image.svg`

    document.title = fullTitle
    upsertMeta('name', 'description', desc)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', img)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertCanonical(url)

    const scriptId = 'jsonld-route'
    const existing = document.getElementById(scriptId)
    if (jsonLd) {
      const script = existing ?? document.createElement('script')
      script.id = scriptId
      script.setAttribute('type', 'application/ld+json')
      script.textContent = JSON.stringify(jsonLd)
      if (!existing) document.head.appendChild(script)
    } else if (existing) {
      existing.remove()
    }
  }, [title, description, path, image, type, jsonLd])

  return null
}
