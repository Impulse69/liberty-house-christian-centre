import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'
import { cn } from '@/utils/cn'

interface SectionHeaderProps {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  invert?: boolean
  className?: string
}

/** Reusable, animated heading block: kicker → title → description. */
export function SectionHeader({
  kicker,
  title,
  description,
  align = 'center',
  invert = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {kicker && (
        <motion.span variants={fadeInUp} className="kicker">
          {kicker}
        </motion.span>
      )}
      <motion.h2
        variants={fadeInUp}
        className={cn(
          'max-w-2xl text-3xl leading-tight sm:text-4xl md:text-[2.6rem]',
          invert && 'text-ivory',
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            'max-w-2xl text-base leading-relaxed sm:text-lg',
            invert ? 'text-midnight-200' : 'text-midnight-500',
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
