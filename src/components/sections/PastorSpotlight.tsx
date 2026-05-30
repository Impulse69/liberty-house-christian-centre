import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SanityImage } from '@/components/common/SanityImage'
import { PortableTextRenderer } from '@/components/common/PortableTextRenderer'
import { Avatar } from '@/components/ui/Avatar'
import { buttonVariants } from '@/components/ui/Button'
import { useFeaturedLeader, useLeaders } from '@/hooks/useContent'
import { hasImage } from '@/services/sanity/image'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'
import { cn } from '@/utils/cn'

export function PastorSpotlight() {
  const { data: featured } = useFeaturedLeader()
  const { data: leaders } = useLeaders()
  const leader = featured ?? leaders?.[0]

  if (!leader) return null

  return (
    <Section tone="midnight" size="lg">
      <div className="halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16"
        >
          <motion.div variants={fadeInUp} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-3xl bg-gold-500/20 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-midnight-900 shadow-lift">
              {hasImage(leader.photo) ? (
                <SanityImage
                  image={leader.photo}
                  alt={leader.name}
                  className="absolute inset-0"
                  sizes="(min-width: 1024px) 30vw, 80vw"
                />
              ) : (
                <Avatar name={leader.name} className="absolute inset-0 h-full w-full text-5xl" />
              )}
            </div>
          </motion.div>

          <div>
            <motion.span variants={fadeInUp} className="kicker">
              Our Leadership
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mt-4 text-3xl text-ivory sm:text-4xl">
              {leader.name}
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-1 text-gold-300">
              {leader.role}
            </motion.p>
            {leader.bio ? (
              <motion.div variants={fadeInUp} className="mt-6 max-w-xl text-midnight-200">
                <PortableTextRenderer value={leader.bio} className="text-midnight-200" />
              </motion.div>
            ) : (
              <motion.p variants={fadeInUp} className="mt-6 max-w-xl text-midnight-200">
                Leading Liberty House Christian Centre with a heart to see this generation impacted,
                hope restored and lives transformed by the love of God.
              </motion.p>
            )}
            <motion.div variants={fadeInUp} className="mt-8">
              <Link
                to="/leadership"
                className={cn(
                  buttonVariants({ variant: 'gold' }),
                )}
              >
                Meet the team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
