import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-midnight-900 text-ivory hover:bg-midnight-800 shadow-soft hover:shadow-card',
  gold: 'bg-gold-400 text-midnight-950 hover:bg-gold-300 shadow-soft hover:shadow-card',
  outline:
    'border border-midnight-200 text-midnight-900 hover:border-midnight-400 hover:bg-white/60',
  ghost: 'text-midnight-800 hover:bg-midnight-100/60',
  secondary: 'bg-white text-midnight-900 border border-sand hover:border-midnight-300 shadow-soft',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
}

/** Returns the composed class string — use directly on <Link> / <a>. */
export function buttonVariants(options?: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}): string {
  const { variant = 'primary', size = 'md', className } = options ?? {}
  return cn(base, variantStyles[variant], sizeStyles[size], className)
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />
}
