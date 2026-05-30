import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Tone = 'cream' | 'white' | 'ivory' | 'sand' | 'midnight'
type Size = 'sm' | 'md' | 'lg'

interface SectionProps {
  children: ReactNode
  id?: string
  tone?: Tone
  size?: Size
  className?: string
}

const tones: Record<Tone, string> = {
  cream: 'bg-cream text-midnight-800',
  white: 'bg-white text-midnight-800',
  ivory: 'bg-ivory text-midnight-800',
  sand: 'bg-sand text-midnight-800',
  midnight: 'bg-midnight-950 text-midnight-100',
}

const sizes: Record<Size, string> = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-20 sm:py-32',
}

/** A full-width page section with consistent tone + vertical rhythm. */
export function Section({ children, id, tone = 'cream', size = 'md', className }: SectionProps) {
  return (
    <section id={id} className={cn('relative', tones[tone], sizes[size], className)}>
      {children}
    </section>
  )
}
