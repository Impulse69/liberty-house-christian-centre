import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type BadgeTone = 'gold' | 'midnight' | 'neutral' | 'outline'

const tones: Record<BadgeTone, string> = {
  gold: 'bg-gold-100 text-gold-800',
  midnight: 'bg-midnight-100 text-midnight-800',
  neutral: 'bg-sand text-midnight-700',
  outline: 'border border-midnight-200 text-midnight-700',
}

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

export function Badge({ children, tone = 'gold', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
