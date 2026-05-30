import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

/** Shimmering placeholder block for loading states. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-sand/70',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite]',
        'before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent',
        className,
      )}
    />
  )
}
