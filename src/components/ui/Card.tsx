import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
}

/** Elevated surface used for sermons, events, leaders, etc. */
export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-sand bg-white shadow-soft',
        interactive &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-midnight-200 hover:shadow-lift',
        className,
      )}
    >
      {children}
    </div>
  )
}
