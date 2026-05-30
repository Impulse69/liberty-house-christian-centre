import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { buttonVariants } from '@/components/ui/Button'
import { contactInfo, serviceTimes } from '@/config/site.config'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'
import { cn } from '@/utils/cn'

export function CtaBand() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="relative overflow-hidden rounded-3xl bg-midnight-950 px-6 py-14 shadow-lift sm:px-12 sm:py-16"
        >
          <div className="halo pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.span variants={fadeInUp} className="kicker">
                Plan Your Visit
              </motion.span>
              <motion.h2 variants={fadeInUp} className="mt-4 text-3xl text-ivory sm:text-4xl">
                We’d love to meet you this weekend
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-4 max-w-md text-midnight-200">
                Come as you are. Expect a warm welcome, uplifting worship and a message of hope for
                your life.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className={buttonVariants({ variant: 'gold' })}>
                  Visit us
                </Link>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Tema+Ghana"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium text-ivory transition-colors hover:bg-white/10',
                  )}
                >
                  <MapPin className="h-4 w-4" />
                  Get directions
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              {serviceTimes.map((service) => (
                <div key={service.name} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                    <Clock className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-medium text-ivory">{service.name}</p>
                    <p className="text-sm text-midnight-200">
                      {service.day} · {service.time}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                  <MapPin className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-medium text-ivory">Find us</p>
                  <p className="text-sm text-midnight-200">
                    {contactInfo.city}, {contactInfo.country}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
