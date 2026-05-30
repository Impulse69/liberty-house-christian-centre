import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, PlayCircle } from 'lucide-react'
import type { Sermon } from '@/types/content'
import { SanityImage } from '@/components/common/SanityImage'
import { Badge } from '@/components/ui/Badge'
import { fadeInUp } from '@/animations/variants'
import { formatDate } from '@/utils/formatDate'

export function SermonCard({ sermon }: { sermon: Sermon }) {
  const to = sermon.slug?.current ? `/sermons/${sermon.slug.current}` : '/sermons'

  return (
    <motion.article variants={fadeInUp}>
      <Link
        to={to}
        className="group block overflow-hidden rounded-2xl border border-sand bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        <div className="relative">
          <SanityImage
            image={sermon.thumbnail}
            alt={sermon.title}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 33vw, 100vw"
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-midnight-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <PlayCircle className="h-12 w-12 text-ivory drop-shadow" strokeWidth={1.4} />
          </span>
          {sermon.series && (
            <span className="absolute left-3 top-3">
              <Badge tone="midnight">{sermon.series}</Badge>
            </span>
          )}
        </div>
        <div className="p-5">
          {sermon.scripture && (
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
              {sermon.scripture}
            </p>
          )}
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-midnight-950 transition-colors group-hover:text-midnight-700">
            {sermon.title}
          </h3>
          {sermon.summary && (
            <p className="mt-2 line-clamp-2 text-sm text-midnight-500">{sermon.summary}</p>
          )}
          <div className="mt-4 flex items-center gap-4 text-xs text-midnight-400">
            {sermon.speaker && <span className="font-medium text-midnight-600">{sermon.speaker}</span>}
            {sermon.date && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(sermon.date)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
