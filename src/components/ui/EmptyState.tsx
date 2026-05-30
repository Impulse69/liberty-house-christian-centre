import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

/** Friendly placeholder shown when a collection has no content yet. */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-midnight-200 bg-white/50 px-6 py-16 text-center',
        className,
      )}
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-midnight-50 text-midnight-400">
        <Icon className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <h3 className="text-lg font-semibold text-midnight-900">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-midnight-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
