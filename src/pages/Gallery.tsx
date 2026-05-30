import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AsyncContent } from '@/components/common/AsyncContent'
import { EmptyState } from '@/components/ui/EmptyState'
import { ImageGrid } from '@/components/common/ImageGrid'
import { Modal } from '@/components/ui/Modal'
import { Skeleton } from '@/components/ui/Skeleton'
import { urlForImage } from '@/services/sanity/image'
import { useGallery } from '@/hooks/useContent'
import { fadeIn } from '@/animations/variants'

export function Gallery() {
  const { data, isLoading, isError, refetch } = useGallery()
  const [index, setIndex] = useState<number | null>(null)
  const images = data ?? []
  const current = index !== null ? images[index] : null

  const go = (dir: 1 | -1) => {
    setIndex((prev) => {
      if (prev === null) return prev
      return (prev + dir + images.length) % images.length
    })
  }

  return (
    <>
      <SEO
        title="Gallery"
        path="/gallery"
        description="Photo highlights from worship, fellowship and ministry at Liberty House Christian Centre."
      />
      <PageHeader
        kicker="Life Together"
        title="Gallery"
        description="A glimpse into the life of our church family."
      />

      <Section tone="cream" size="lg">
        <Container>
          <AsyncContent
            isLoading={isLoading}
            isError={isError}
            data={images}
            onRetry={() => refetch()}
            isEmpty={(items) => items.length === 0}
            loader={
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square sm:aspect-[4/5]" />
                ))}
              </div>
            }
            empty={
              <EmptyState
                icon={Images}
                title="No photos yet"
                description="Photos from our gatherings and events will appear here soon."
              />
            }
          >
            {(items) => (
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <ImageGrid images={items} onSelect={setIndex} />
              </motion.div>
            )}
          </AsyncContent>
        </Container>
      </Section>

      <Modal open={current !== null} onClose={() => setIndex(null)} label="Photo viewer" className="max-w-4xl bg-midnight-950">
        {current && (
          <div className="relative">
            <img
              src={urlForImage(current.image).width(1600).quality(85).url()}
              alt={current.caption ?? 'Gallery photo'}
              className="mx-auto max-h-[80vh] w-auto object-contain"
            />
            {current.caption && (
              <p className="px-6 py-4 text-center text-sm text-midnight-200">{current.caption}</p>
            )}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-midnight-900 shadow-soft transition hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-midnight-900 shadow-soft transition hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}
