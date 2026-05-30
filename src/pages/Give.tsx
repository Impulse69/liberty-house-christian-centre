import { motion } from 'framer-motion'
import { Building2, HandCoins, HeartHandshake, Smartphone } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { useSiteSettings } from '@/hooks/useContent'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

export function Give() {
  const { data: settings } = useSiteSettings()
  const giving = settings?.giving

  const momoDetail = giving?.momoNumber
    ? `${giving.momoNumber}${giving.momoName ? ` · ${giving.momoName}` : ''}`
    : 'Details coming soon'

  const bankDetail = giving?.accountNumber
    ? `${giving.bankName ?? 'Bank'} · ${giving.accountName ?? ''} · ${giving.accountNumber}`
    : 'Details coming soon'

  const methods = [
    {
      icon: Smartphone,
      title: 'Mobile Money',
      detail: momoDetail,
      note: 'Give quickly and securely via MoMo.',
    },
    {
      icon: Building2,
      title: 'Bank Transfer',
      detail: bankDetail,
      note: 'Set up a one-off or recurring transfer.',
    },
    {
      icon: HandCoins,
      title: 'In Person',
      detail: 'During any service',
      note: 'Give your offering when we gather together.',
    },
  ]

  return (
    <>
      <SEO
        title="Giving"
        path="/give"
        description="Support the mission of Liberty House Christian Centre through your generous giving."
      />
      <PageHeader
        kicker="Generosity"
        title="Give & support the mission"
        description="Your generosity helps us share hope and bring restoration to our generation."
      />

      <Section tone="cream" size="lg">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeInUp}>
              <HeartHandshake className="mx-auto h-10 w-10 text-gold-500" strokeWidth={1.5} />
            </motion.span>
            <motion.p
              variants={fadeInUp}
              className="mt-6 font-display text-2xl leading-snug text-midnight-900 sm:text-3xl"
            >
              “Each of you should give what you have decided in your heart to give… for God loves a
              cheerful giver.”
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
              2 Corinthians 9:7
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {methods.map((method) => (
              <motion.div
                key={method.title}
                variants={fadeInUp}
                className="rounded-2xl border border-sand bg-white p-7 text-center shadow-soft"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-midnight-900 text-gold-300">
                  <method.icon className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-midnight-950">{method.title}</h3>
                <p className="mt-2 font-medium text-midnight-800">{method.detail}</p>
                <p className="mt-2 text-sm text-midnight-500">{method.note}</p>
              </motion.div>
            ))}
          </motion.div>

          {giving?.intro && (
            <p className="mx-auto mt-12 max-w-2xl text-center text-midnight-600">{giving.intro}</p>
          )}
        </Container>
      </Section>
    </>
  )
}
