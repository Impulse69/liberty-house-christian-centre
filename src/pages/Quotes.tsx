import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote as QuoteIcon } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AsyncContent } from '@/components/common/AsyncContent'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { QuoteCard } from '@/components/cards/QuoteCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { urlForImage, hasImage } from '@/services/sanity/image'
import { useQuotes } from '@/hooks/useContent'
import type { PastorQuote } from '@/types/content'
import { staggerContainer } from '@/animations/variants'

export function Quotes() {
  const { data, isLoading, isError, refetch } = useQuotes()
  const [selected, setSelected] = useState<PastorQuote | null>(null)

  const handleSelect = (quote: PastorQuote) => {
    if (hasImage(quote.quoteImage)) setSelected(quote)
  }

  return (
    <>
      <SEO
        title="Inspirational Quotes"
        path="/quotes"
        description="Faith-building quotes and inspirational posts from Liberty House Christian Centre."
      />
      <PageHeader
        kicker="Words of Life"
        title="Inspirational quotes"
        description="Encouragement from the Word to strengthen your faith every day."
      />

      <Section tone="cream" size="lg">
        <Container>
          <AsyncContent
            isLoading={isLoading}
            isError={isError}
            data={data}
            onRetry={() => refetch()}
            isEmpty={(items) => items.length === 0}
            loader={
              <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="mb-6 h-48 w-full" />
                ))}
              </div>
            }
            empty={
              <EmptyState
                icon={QuoteIcon}
                title="No quotes yet"
                description="Inspirational posts will appear here as they are shared."
              />
            }
          >
            {(quotes) => (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="columns-1 gap-6 sm:columns-2 lg:columns-3"
              >
                {quotes.map((quote) => (
                  <QuoteCard key={quote._id} quote={quote} onSelect={handleSelect} />
                ))}
              </motion.div>
            )}
          </AsyncContent>
        </Container>
      </Section>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        label="Quote"
        className="max-w-3xl bg-midnight-950"
      >
        {selected && hasImage(selected.quoteImage) && (
          <div>
            <img
              src={urlForImage(selected.quoteImage).width(1400).quality(85).url()}
              alt={selected.caption ?? selected.quoteText ?? 'Inspirational quote'}
              className="mx-auto max-h-[80vh] w-auto object-contain"
            />
            {(selected.caption || selected.author) && (
              <div className="px-6 py-4 text-center">
                {selected.caption && (
                  <p className="text-sm text-midnight-200">{selected.caption}</p>
                )}
                {selected.author && (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-300">
                    {selected.author}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}
