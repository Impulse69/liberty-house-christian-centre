import type { GalleryImage } from '@/types/content'
import { SanityImage } from './SanityImage'
import { cn } from '@/utils/cn'

interface ImageGridProps {
  images: GalleryImage[]
  onSelect?: (index: number) => void
  className?: string
}

/** Uniform, responsive gallery grid with hover captions. */
export function ImageGrid({ images, onSelect, className }: ImageGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4', className)}>
      {images.map((item, index) => (
        <button
          key={item._id}
          type="button"
          onClick={() => onSelect?.(index)}
          className="group relative aspect-square overflow-hidden rounded-xl bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:aspect-[4/5]"
        >
          <SanityImage
            image={item.image}
            alt={item.caption}
            className="absolute inset-0"
            imgClassName="transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 640px) 33vw, 50vw"
          />
          {item.caption && (
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-midnight-950/85 to-transparent p-3 text-left text-xs text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.caption}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
