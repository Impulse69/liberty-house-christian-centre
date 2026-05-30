import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { cn } from '@/utils/cn'

interface PageHeaderProps {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
}

/** Dark gradient hero band used at the top of inner pages. */
export function PageHeader({ kicker, title, description, align = 'center' }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-midnight-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={cn(
            'flex flex-col gap-4',
            align === 'center' ? 'items-center text-center' : 'items-start text-left',
          )}
        >
          {kicker && (
            <motion.span variants={fadeInUp} className="kicker">
              {kicker}
            </motion.span>
          )}
          <motion.h1
            variants={fadeInUp}
            className="max-w-3xl text-4xl text-ivory sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-lg leading-relaxed text-midnight-200"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
