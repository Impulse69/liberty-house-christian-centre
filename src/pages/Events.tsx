import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AsyncContent } from '@/components/common/AsyncContent'
import { EmptyState } from '@/components/ui/EmptyState'
import { EventCard } from '@/components/cards/EventCard'
import { SkeletonCardGrid } from '@/components/common/SkeletonCard'
import { useEvents } from '@/hooks/useContent'
import { isUpcoming } from '@/utils/formatDate'
import { staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

export function Events() {
  const { data, isLoading, isError, refetch } = useEvents()

  const upcoming = (data ?? []).filter((event) => isUpcoming(event.startAt))
  const past = (data ?? []).filter((event) => !isUpcoming(event.startAt)).reverse()

  return (
    <>
      <SEO
        title="Events & Programs"
        path="/events"
        description="Upcoming events, services and programs at Liberty House Christian Centre, Tema."
      />
      <PageHeader
        kicker="What's On"
        title="Events & programs"
        description="From Sunday gatherings to special programs — there's always a place for you."
      />

      <Section tone="cream" size="lg">
        <Container>
          <AsyncContent
            isLoading={isLoading}
            isError={isError}
            data={data}
            onRetry={() => refetch()}
            isEmpty={(events) => events.length === 0}
            loader={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <SkeletonCardGrid count={6} />
              </div>
            }
            empty={
              <EmptyState
                icon={CalendarDays}
                title="No events scheduled yet"
                description="New events and programs will be announced here. Stay tuned!"
              />
            }
          >
            {() => (
              <div className="space-y-16">
                {upcoming.length > 0 && (
                  <div>
                    <h2 className="mb-8 text-2xl sm:text-3xl">Upcoming</h2>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={revealViewport}
                      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {upcoming.map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </motion.div>
                  </div>
                )}

                {past.length > 0 && (
                  <div>
                    <h2 className="mb-8 text-2xl text-midnight-700 sm:text-3xl">Past events</h2>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={revealViewport}
                      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {past.map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </AsyncContent>
        </Container>
      </Section>
    </>
  )
}
