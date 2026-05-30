import { motion } from 'framer-motion'
import { Compass, Eye, Flame, Heart, Sparkles, Target } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { PortableTextRenderer } from '@/components/common/PortableTextRenderer'
import { useSiteSettings } from '@/hooks/useContent'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

const values = [
  { icon: Flame, title: 'Passion for God', text: 'Wholehearted worship and devotion to Jesus.' },
  { icon: Heart, title: 'Love for People', text: 'Genuine care that reflects the heart of Christ.' },
  { icon: Sparkles, title: 'Spirit-Led', text: 'Yielded to the leading of the Holy Spirit.' },
  { icon: Compass, title: 'Purpose-Driven', text: 'Helping every believer discover their calling.' },
]

export function VisionMission() {
  const { data: settings } = useSiteSettings()

  return (
    <>
      <SEO
        title="Vision & Mission"
        path="/vision-mission"
        description="The vision and mission of Liberty House Christian Centre — impacting our generation, giving hope and bringing restoration."
      />
      <PageHeader
        kicker="Vision & Mission"
        title="What drives us forward"
        description="Our purpose shapes everything we do as a church family."
      />

      <Section tone="cream" size="lg">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="grid gap-6 lg:grid-cols-2"
          >
            <motion.div
              variants={fadeInUp}
              className="rounded-3xl border border-sand bg-white p-8 shadow-soft sm:p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-midnight-900 text-gold-300">
                <Eye className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <h2 className="mt-6 text-2xl sm:text-3xl">Our Vision</h2>
              <div className="mt-4 text-base leading-relaxed text-midnight-600">
                {settings?.vision ? (
                  <PortableTextRenderer value={settings.vision} />
                ) : (
                  <p>
                    To be a thriving house of liberty where lives are transformed, hope is restored
                    and a generation is raised to carry the light of Christ into every sphere of
                    society.
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-3xl border border-sand bg-midnight-950 p-8 text-midnight-100 shadow-soft sm:p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300">
                <Target className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <h2 className="mt-6 text-2xl text-ivory sm:text-3xl">Our Mission</h2>
              <p className="mt-4 text-base leading-relaxed text-midnight-200">
                {settings?.mission ??
                  'Impacting our generation, giving hope and bringing restoration — through passionate worship, sound biblical teaching and a loving community where everyone belongs.'}
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section tone="white" size="lg">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <motion.span variants={fadeInUp} className="kicker block text-center">
              Our Core Values
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mt-3 text-center text-3xl sm:text-4xl">
              The values we live by
            </motion.h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="rounded-2xl border border-sand bg-cream p-6 text-center shadow-soft"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-midnight-900 text-gold-300">
                    <value.icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-midnight-950">{value.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-midnight-500">{value.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
