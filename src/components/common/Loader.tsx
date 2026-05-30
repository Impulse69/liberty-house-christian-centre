import { cn } from '@/utils/cn'

interface LoaderProps {
  className?: string
  label?: string
}

/** Inline spinner for full-section loading states. */
export function Loader({ className, label = 'Loading' }: LoaderProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16', className)} role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-midnight-200 border-t-gold-500" />
      <span className="text-sm text-midnight-400">{label}…</span>
    </div>
  )
}
