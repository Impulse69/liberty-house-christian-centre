import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/common/SectionHeader'
import { QuoteCard } from '@/components/cards/QuoteCard'
import { buttonVariants } from '@/components/ui/Button'
import { useQuotes } from '@/hooks/useContent'
import { staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

export function QuotesPreview() {
  const { data, isLoading } = useQuotes()
  const quotes = data?.slice(0, 3) ?? []

  if (isLoading || quotes.length === 0) return null

  return (
    <Section tone="sand" size="lg">
      <Container>
        <SectionHeader
          kicker="Words of Life"
          title="Inspiration from the pulpit"
          description="Faith-filled words to carry with you through the week."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3"
        >
          {quotes.map((quote) => (
            <QuoteCard key={quote._id} quote={quote} />
          ))}
        </motion.div>
        <div className="mt-10 flex justify-center">
          <Link to="/quotes" className={buttonVariants({ variant: 'outline' })}>
            More inspiration
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}
