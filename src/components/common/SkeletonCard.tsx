import { Skeleton } from '@/components/ui/Skeleton'

/** Card-shaped loading placeholder used in content grids. */
export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  )
}
