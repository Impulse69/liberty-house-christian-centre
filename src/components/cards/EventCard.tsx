import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import type { ChurchEvent } from '@/types/content'
import { SanityImage } from '@/components/common/SanityImage'
import { Badge } from '@/components/ui/Badge'
import { fadeInUp } from '@/animations/variants'
import { dateParts, formatTime, isUpcoming } from '@/utils/formatDate'

export function EventCard({ event }: { event: ChurchEvent }) {
  const to = event.slug?.current ? `/events/${event.slug.current}` : '/events'
  const chip = dateParts(event.startAt)
  const upcoming = isUpcoming(event.startAt)

  return (
    <motion.article variants={fadeInUp}>
      <Link
        to={to}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        <div className="relative">
          <SanityImage
            image={event.image}
            alt={event.title}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 33vw, 100vw"
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
          {chip && (
            <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-ivory/95 px-3 py-2 text-center shadow-soft backdrop-blur">
              <span className="font-display text-xl font-semibold leading-none text-midnight-950">
                {chip.day}
              </span>
              <span className="text-[0.65rem] font-semibold tracking-wider text-gold-600">
                {chip.month}
              </span>
            </div>
          )}
          {!upcoming && (
            <span className="absolute right-4 top-4">
              <Badge tone="neutral">Past</Badge>
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          {event.category && (
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
              {event.category}
            </p>
          )}
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-midnight-950 transition-colors group-hover:text-midnight-700">
            {event.title}
          </h3>
          {event.summary && (
            <p className="mt-2 line-clamp-2 text-sm text-midnight-500">{event.summary}</p>
          )}
          <div className="mt-4 space-y-1.5 text-xs text-midnight-500">
            {event.startAt && (
              <p className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold-500" />
                {formatTime(event.startAt)}
              </p>
            )}
            {event.location && (
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold-500" />
                {event.location}
              </p>
            )}
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-midnight-700 transition-colors group-hover:text-gold-600">
            View details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
