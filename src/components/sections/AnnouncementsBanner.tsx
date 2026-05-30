import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Megaphone, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useAnnouncements } from '@/hooks/useContent'

/** Highlights the most relevant active announcement; dismissible per session. */
export function AnnouncementsBanner() {
  const { data } = useAnnouncements()
  const [dismissed, setDismissed] = useState(false)
  const announcement = data?.[0]

  if (!announcement || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-midnight-900 text-ivory"
      >
        <Container className="flex items-center gap-3 py-3">
          <Megaphone className="h-5 w-5 shrink-0 text-gold-300" strokeWidth={1.8} />
          <p className="flex-1 text-sm">
            <span className="font-semibold">{announcement.title}</span>
            {announcement.body && (
              <span className="ml-2 text-midnight-200">{announcement.body}</span>
            )}
            {announcement.link && (
              <a
                href={announcement.link}
                className="ml-2 font-medium text-gold-300 underline underline-offset-2"
              >
                Learn more
              </a>
            )}
          </p>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-midnight-200 transition-colors hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </Container>
      </motion.div>
    </AnimatePresence>
  )
}
