import { Link } from 'react-router-dom'
import type { SanityImageRef } from '@/types/content'
import { hasImage, urlForImage } from '@/services/sanity/image'
import { cn } from '@/utils/cn'

interface LogoProps {
  /** Uploaded logo from Sanity. When present, it replaces the built-in mark. */
  logo?: SanityImageRef
  className?: string
  textClassName?: string
  subTextClassName?: string
}

/** Brand lockup: uploaded logo if set, otherwise the built-in monogram + wordmark. */
export function Logo({ logo, className, textClassName, subTextClassName }: LogoProps) {
  const aspect = logo?.dimensions?.aspectRatio
  // Treat a (roughly) square logo as a round badge so square/white-padded
  // uploads render as the circular emblem they're meant to be.
  const isRound = hasImage(logo) && (aspect === undefined || Math.abs(aspect - 1) < 0.2)

  return (
    <Link
      to="/"
      className={cn('group flex items-center gap-3', className)}
      aria-label="Liberty House Christian Centre — home"
    >
      {hasImage(logo) ? (
        isRound ? (
          <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-14 sm:w-14">
            <img
              src={urlForImage(logo).width(220).height(220).fit('crop').url()}
              alt="Liberty House Christian Centre"
              className="h-full w-full scale-[1.12] object-cover"
            />
          </span>
        ) : (
          <img
            src={urlForImage(logo).height(160).fit('max').url()}
            alt="Liberty House Christian Centre"
            className="h-12 w-auto max-w-[220px] object-contain transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-14"
          />
        )
      ) : (
        <>
          <svg
            viewBox="0 0 64 64"
            className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="14" className="fill-midnight-900" />
            <path
              d="M32 9c2.6 2.6 4.2 5.1 4.2 7.7 0 2.5-1.9 4.4-4.2 4.4s-4.2-1.9-4.2-4.4c0-2.6 1.6-5.1 4.2-7.7z"
              className="fill-gold-300"
            />
            <path d="M32 21.5 51 35.5H13L32 21.5z" className="fill-gold-300" />
            <rect x="18" y="35.5" width="5.5" height="17" rx="1" className="fill-gold-500" />
            <rect x="40.5" y="35.5" width="5.5" height="17" rx="1" className="fill-gold-500" />
            <path d="M27 52.5V43.5a5 5 0 0 1 10 0v9z" className="fill-gold-500" />
            <rect x="13" y="52.5" width="38" height="3.5" rx="1.5" className="fill-gold-300" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className={cn('font-display text-lg font-semibold', textClassName)}>
              Liberty House
            </span>
            <span
              className={cn(
                'mt-1 text-[0.62rem] font-semibold tracking-[0.22em] text-gold-500',
                subTextClassName,
              )}
            >
              CHRISTIAN CENTRE
            </span>
          </span>
        </>
      )}
    </Link>
  )
}
