import { cn } from '@/utils/cn'

interface AvatarProps {
  name: string
  className?: string
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

/** Initials fallback used when a person has no photo. */
export function Avatar({ name, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br from-midnight-800 to-midnight-950 font-display text-2xl font-semibold text-gold-300',
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
