import { useMemo, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AsyncContent } from '@/components/common/AsyncContent'
import { EmptyState } from '@/components/ui/EmptyState'
import { SermonCard } from '@/components/cards/SermonCard'
import { SkeletonCardGrid } from '@/components/common/SkeletonCard'
import { useSermons } from '@/hooks/useContent'
import { staggerContainer } from '@/animations/variants'
import { cn } from '@/utils/cn'

export function Sermons() {
  const { data, isLoading, isError, refetch } = useSermons()
  const [series, setSeries] = useState<string | null>(null)

  const allSeries = useMemo(
    () => Array.from(new Set((data ?? []).map((s) => s.series).filter(Boolean))) as string[],
    [data],
  )
  const filtered = series ? (data ?? []).filter((s) => s.series === series) : (data ?? [])

  return (
    <>
      <SEO
        title="Sermons"
        path="/sermons"
        description="Watch and listen to messages from Liberty House Christian Centre, Tema."
      />
      <PageHeader
        kicker="Messages"
        title="Sermons & teachings"
        description="Be encouraged, equipped and inspired by the Word of God — anytime, anywhere."
      />

      <Section tone="cream" size="lg">
        <Container>
          {allSeries.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              <FilterChip active={series === null} onClick={() => setSeries(null)}>
                All
              </FilterChip>
              {allSeries.map((s) => (
                <FilterChip key={s} active={series === s} onClick={() => setSeries(s)}>
                  {s}
                </FilterChip>
              ))}
            </div>
          )}

          <AsyncContent
            isLoading={isLoading}
            isError={isError}
            data={filtered}
            onRetry={() => refetch()}
            isEmpty={(items) => items.length === 0}
            loader={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <SkeletonCardGrid count={6} />
              </div>
            }
            empty={
              <EmptyState
                icon={PlayCircle}
                title="No sermons yet"
                description="Messages will appear here as they are published. Check back soon."
              />
            }
          >
            {(sermons) => (
              <motion.div
                key={series ?? 'all'}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {sermons.map((sermon) => (
                  <SermonCard key={sermon._id} sermon={sermon} />
                ))}
              </motion.div>
            )}
          </AsyncContent>
        </Container>
      </Section>
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-midnight-900 text-ivory'
          : 'border border-sand bg-white text-midnight-600 hover:border-midnight-300',
      )}
    >
      {children}
    </button>
  )
}
