import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, HandHeart, HeartHandshake, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { buttonVariants } from '@/components/ui/Button'
import { useSiteSettings } from '@/hooks/useContent'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

const pillars = [
  {
    icon: HandHeart,
    title: 'Giving Hope',
    description: 'We point every heart to the unfailing hope found in Jesus Christ.',
  },
  {
    icon: HeartHandshake,
    title: 'Bringing Restoration',
    description: 'We believe broken things can be made whole — families, dreams and lives.',
  },
  {
    icon: Sparkles,
    title: 'Impacting Our Generation',
    description: 'We raise believers who carry light and influence into their world.',
  },
]

export function WelcomeSection() {
  const { data: settings } = useSiteSettings()
  const mission =
    settings?.mission ??
    'Liberty House Christian Centre is a warm, Spirit-filled family in Tema, Ghana. Whether you are exploring faith for the first time or looking for a church to call home, there is a place for you here.'

  return (
    <Section tone="cream" size="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <motion.span variants={fadeInUp} className="kicker">
              Welcome Home
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mt-4 text-3xl sm:text-4xl md:text-[2.6rem]">
              A family of faith in the heart of Tema
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-base leading-relaxed text-midnight-600 sm:text-lg"
            >
              {mission}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className={buttonVariants({ variant: 'primary' })}>
                About our church
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/vision-mission" className={buttonVariants({ variant: 'outline' })}>
                Our vision & mission
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="grid gap-4"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeInUp}
                className="flex items-start gap-4 rounded-2xl border border-sand bg-white p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-midnight-900 text-gold-300">
                  <pillar.icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-midnight-950">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-midnight-500">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
