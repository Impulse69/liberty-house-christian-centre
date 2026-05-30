import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/common/SectionHeader'
import { SkeletonCardGrid } from '@/components/common/SkeletonCard'
import { EventCard } from '@/components/cards/EventCard'
import { buttonVariants } from '@/components/ui/Button'
import { useEvents } from '@/hooks/useContent'
import { isUpcoming } from '@/utils/formatDate'
import { staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

export function UpcomingEvents() {
  const { data, isLoading } = useEvents()

  const upcoming = (data ?? []).filter((event) => isUpcoming(event.startAt))
  // Fall back to the most recent events if nothing is upcoming yet.
  const events = (upcoming.length > 0 ? upcoming : (data ?? [])).slice(0, 3)

  if (!isLoading && events.length === 0) return null

  return (
    <Section tone="cream" size="lg">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            align="left"
            kicker="What's On"
            title="Events & programs"
            description="There's always something happening — come and be part of the family."
            className="max-w-xl"
          />
          <Link to="/events" className={buttonVariants({ variant: 'ghost', className: 'shrink-0' })}>
            All events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {isLoading ? (
            <SkeletonCardGrid count={3} />
          ) : (
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}
        </motion.div>
      </Container>
    </Section>
  )
}
