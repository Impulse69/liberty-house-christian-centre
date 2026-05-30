import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
  textClassName?: string
  subTextClassName?: string
}

/** Brand lockup: monogram mark + two-line wordmark. */
export function Logo({ className, textClassName, subTextClassName }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('group flex items-center gap-3', className)}
      aria-label="Liberty House Christian Centre — home"
    >
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
        <span className={cn('font-display text-lg font-semibold', textClassName)}>Liberty House</span>
        <span
          className={cn(
            'mt-1 text-[0.62rem] font-semibold tracking-[0.22em] text-gold-500',
            subTextClassName,
          )}
        >
          CHRISTIAN CENTRE
        </span>
      </span>
    </Link>
  )
}
