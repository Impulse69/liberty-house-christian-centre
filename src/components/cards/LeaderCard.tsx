import { motion } from 'framer-motion'
import type { Leader } from '@/types/content'
import { SanityImage } from '@/components/common/SanityImage'
import { Avatar } from '@/components/ui/Avatar'
import { hasImage } from '@/services/sanity/image'
import { fadeInUp } from '@/animations/variants'

interface LeaderCardProps {
  leader: Leader
  onSelect?: (leader: Leader) => void
}

export function LeaderCard({ leader, onSelect }: LeaderCardProps) {
  const Tag = onSelect ? 'button' : 'div'

  return (
    <motion.div variants={fadeInUp}>
      <Tag
        type={onSelect ? 'button' : undefined}
        onClick={onSelect ? () => onSelect(leader) : undefined}
        className="group block w-full overflow-hidden rounded-2xl border border-sand bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-midnight-900">
          {hasImage(leader.photo) ? (
            <SanityImage
              image={leader.photo}
              alt={leader.name}
              className="absolute inset-0"
              sizes="(min-width: 1024px) 25vw, 50vw"
              imgClassName="transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Avatar name={leader.name} className="absolute inset-0 h-full w-full text-4xl" />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight-950/90 via-midnight-950/30 to-transparent p-4 pt-12">
            <h3 className="font-display text-lg font-semibold text-ivory">{leader.name}</h3>
            <p className="text-sm text-gold-300">{leader.role}</p>
          </div>
        </div>
      </Tag>
    </motion.div>
  )
}
