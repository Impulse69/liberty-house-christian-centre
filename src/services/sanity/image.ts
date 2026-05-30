import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './client'
import type { SanityImageRef } from '@/types/content'

const builder = imageUrlBuilder(sanityClient)

/** Build an optimized image URL using Sanity's image pipeline (CDN). */
export function urlForImage(source: SanityImageRef | SanityImageSource) {
  return builder.image(source as SanityImageSource).auto('format')
}

/** True when an image field actually references an uploaded asset. */
export function hasImage(source?: SanityImageRef): source is SanityImageRef {
  return Boolean(source?.asset?._ref)
}
