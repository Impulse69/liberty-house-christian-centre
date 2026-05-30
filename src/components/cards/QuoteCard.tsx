import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { PastorQuote } from '@/types/content'
import { SanityImage } from '@/components/common/SanityImage'
import { hasImage } from '@/services/sanity/image'
import { fadeInUp } from '@/animations/variants'

interface QuoteCardProps {
  quote: PastorQuote
  onSelect?: (quote: PastorQuote) => void
}

/**
 * Renders a pastor quote as either an uploaded image post or a styled text card.
 */
export function QuoteCard({ quote, onSelect }: QuoteCardProps) {
  if (hasImage(quote.quoteImage)) {
    return (
      <motion.figure variants={fadeInUp} className="mb-4 break-inside-avoid">
        <button
          type="button"
          onClick={onSelect ? () => onSelect(quote) : undefined}
          className="group block w-full overflow-hidden rounded-2xl border border-sand bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <SanityImage
            image={quote.quoteImage}
            alt={quote.caption ?? quote.quoteText ?? 'Inspirational quote'}
            sizes="(min-width: 1024px) 33vw, 100vw"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {(quote.caption || quote.author) && (
            <figcaption className="px-5 py-4 text-left">
              {quote.caption && <p className="text-sm text-midnight-600">{quote.caption}</p>}
              {quote.author && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-600">
                  {quote.author}
                </p>
              )}
            </figcaption>
          )}
        </button>
      </motion.figure>
    )
  }

  return (
    <motion.figure
      variants={fadeInUp}
      className="mb-4 break-inside-avoid rounded-2xl border border-sand bg-gradient-to-br from-white to-cream p-7 shadow-soft"
    >
      <Quote className="h-8 w-8 text-gold-300" />
      <blockquote className="mt-4 font-display text-xl leading-snug text-midnight-900">
        “{quote.quoteText}”
      </blockquote>
      {quote.author && (
        <figcaption className="mt-5 text-sm font-semibold uppercase tracking-wider text-gold-600">
          {quote.author}
        </figcaption>
      )}
    </motion.figure>
  )
}
