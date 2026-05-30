import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

/** Shown when a content request fails. */
export function ErrorState({
  title = 'Something went wrong',
  description = 'We couldn’t load this content right now. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-sand bg-white/60 px-6 py-16 text-center',
        className,
      )}
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <TriangleAlert className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <h3 className="text-lg font-semibold text-midnight-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-midnight-500">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
