import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/common/SectionHeader'
import { SkeletonCardGrid } from '@/components/common/SkeletonCard'
import { SermonCard } from '@/components/cards/SermonCard'
import { buttonVariants } from '@/components/ui/Button'
import { useSermons } from '@/hooks/useContent'
import { staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

export function FeaturedSermons() {
  const { data, isLoading } = useSermons()
  const sermons = data?.slice(0, 3) ?? []

  if (!isLoading && sermons.length === 0) return null

  return (
    <Section tone="white" size="lg">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            align="left"
            kicker="Messages"
            title="Be encouraged by the Word"
            description="Catch up on recent messages and grow in faith wherever you are."
            className="max-w-xl"
          />
          <Link
            to="/sermons"
            className={buttonVariants({ variant: 'ghost', className: 'shrink-0' })}
          >
            All sermons
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
            sermons.map((sermon) => <SermonCard key={sermon._id} sermon={sermon} />)
          )}
        </motion.div>
      </Container>
    </Section>
  )
}
