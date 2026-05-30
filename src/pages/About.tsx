import { motion } from 'framer-motion'
import { BookOpen, HandHeart, Music, Users } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { PortableTextRenderer } from '@/components/common/PortableTextRenderer'
import { CtaBand } from '@/components/sections/CtaBand'
import { useSiteSettings } from '@/hooks/useContent'
import { siteConfig } from '@/config/site.config'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

const expectations = [
  { icon: HandHeart, title: 'A warm welcome', text: 'You’ll be received like family from the moment you arrive.' },
  { icon: Music, title: 'Uplifting worship', text: 'Heartfelt praise that ushers you into God’s presence.' },
  { icon: BookOpen, title: 'A practical Word', text: 'Bible teaching you can apply to everyday life.' },
  { icon: Users, title: 'Genuine community', text: 'Real relationships and space to grow together.' },
]

export function About() {
  const { data: settings } = useSiteSettings()

  return (
    <>
      <SEO
        title="About the Church"
        path="/about"
        description={`Learn about ${siteConfig.name} — a vibrant family of faith in Tema, Ghana.`}
      />
      <PageHeader
        kicker="About Us"
        title="A house of hope and restoration"
        description="We are a community of believers in Tema committed to knowing God and making Him known."
      />

      <Section tone="cream" size="lg">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
            >
              <motion.span variants={fadeInUp} className="kicker">
                Who we are
              </motion.span>
              <motion.h2 variants={fadeInUp} className="mt-4 text-3xl sm:text-4xl">
                Our story
              </motion.h2>
              <motion.div variants={fadeInUp} className="mt-5 space-y-4 text-base leading-relaxed text-midnight-600">
                {settings?.about ? (
                  <PortableTextRenderer value={settings.about} />
                ) : (
                  <>
                    <p>
                      Liberty House Christian Centre is a Christ-centred church in Tema, Ghana, born
                      out of a desire to see lives transformed by the power of the gospel. Our name
                      reflects our heartbeat — a house where people find true liberty in Christ.
                    </p>
                    <p>
                      We exist to impact our generation, give hope to the hopeless and bring
                      restoration to all who are weary. Through worship, the teaching of God’s Word
                      and authentic community, we help people take their next step with Jesus.
                    </p>
                    <p>
                      Wherever you are on your journey of faith, you are welcome here. Come and
                      discover the family God has prepared for you.
                    </p>
                  </>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              className="grid gap-4 sm:grid-cols-2"
            >
              {expectations.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="rounded-2xl border border-sand bg-white p-6 shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-midnight-900 text-gold-300">
                    <item.icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-midnight-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-midnight-500">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
