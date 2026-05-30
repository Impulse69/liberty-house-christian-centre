import { useState } from 'react'
import { hasImage, urlForImage } from '@/services/sanity/image'
import type { SanityImageRef } from '@/types/content'
import { cn } from '@/utils/cn'

interface SanityImageProps {
  image?: SanityImageRef
  alt?: string
  /** Largest rendered width (px) — used as the default URL width. */
  width?: number
  sizes?: string
  /** Tailwind aspect utility, e.g. "aspect-[4/3]". */
  aspect?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  fallbackLabel?: string
}

const RESPONSIVE_WIDTHS = [480, 768, 1080, 1600]

/** CDN-optimized image with LQIP blur-up and a graceful branded fallback. */
export function SanityImage({
  image,
  alt,
  width = 1200,
  sizes = '100vw',
  aspect,
  className,
  imgClassName,
  priority = false,
  fallbackLabel = 'Liberty House',
}: SanityImageProps) {
  const [loaded, setLoaded] = useState(false)

  if (!hasImage(image)) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-midnight-100 via-sand to-cream',
          aspect,
          className,
        )}
        aria-hidden="true"
      >
        <span className="font-display text-lg text-midnight-300">{fallbackLabel}</span>
      </div>
    )
  }

  const resolvedAlt = alt ?? image.alt ?? ''
  const src = urlForImage(image).width(width).quality(82).url()
  const srcSet = RESPONSIVE_WIDTHS.map(
    (w) => `${urlForImage(image).width(w).quality(82).url()} ${w}w`,
  ).join(', ')

  return (
    <div className={cn('relative overflow-hidden bg-sand', aspect, className)}>
      {image.lqip && (
        <img
          src={image.lqip}
          alt=""
          aria-hidden="true"
          className={cn(
            'absolute inset-0 h-full w-full scale-105 object-cover blur-xl transition-opacity duration-500',
            loaded ? 'opacity-0' : 'opacity-100',
          )}
        />
      )}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={resolvedAlt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          'relative h-full w-full object-cover transition-opacity duration-700 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}
