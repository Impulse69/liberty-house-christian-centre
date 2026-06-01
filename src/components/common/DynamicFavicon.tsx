import { useEffect } from 'react'
import { useSiteData } from '@/hooks/useSiteData'
import { hasImage, urlForImage } from '@/services/sanity/image'

function setIcon(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.rel = rel
    document.head.appendChild(link)
  }
  link.href = href
  link.removeAttribute('type')
}

/**
 * Updates the browser-tab favicon and apple-touch-icon from the CMS
 * (siteSettings.favicon, falling back to the logo) when one is uploaded.
 * The static icons in index.html remain the default until then.
 */
export function DynamicFavicon() {
  const { favicon, logo } = useSiteData()
  const source = favicon ?? logo

  useEffect(() => {
    if (!hasImage(source)) return
    setIcon('icon', urlForImage(source).width(64).height(64).fit('crop').url())
    setIcon('apple-touch-icon', urlForImage(source).width(180).height(180).fit('crop').url())
  }, [source])

  return null
}
