import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, PlayCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SanityImage } from '@/components/common/SanityImage'
import { buttonVariants } from '@/components/ui/Button'
import { useHeroBanners } from '@/hooks/useContent'
import { useSiteData } from '@/hooks/useSiteData'
import { siteConfig } from '@/config/site.config'
import { hasImage } from '@/services/sanity/image'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { cn } from '@/utils/cn'

export function Hero() {
  const { data: banners } = useHeroBanners()
  const { serviceTimes } = useSiteData()
  const hero = banners?.[0]

  const title = hero?.title ?? 'A place to belong, believe and become'
  const subtitle = hero?.subtitle ?? siteConfig.tagline

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-midnight-950">
      {/* Background image (if provided) */}
      {hasImage(hero?.image) && (
        <SanityImage
          image={hero?.image}
          alt=""
          priority
          width={1920}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
          imgClassName="opacity-40"
        />
      )}

      {/* Gradient + halo overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-midnight-950/85 via-midnight-950/70 to-midnight-950"
        aria-hidden="true"
      />
      <div className="halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-gold-300 backdrop-blur"
          >
            WELCOME TO {siteConfig.shortName.toUpperCase()} · {siteConfig.foundedCity.toUpperCase()}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="mt-6 text-4xl leading-[1.08] text-ivory sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-midnight-200 sm:text-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to={hero?.ctaHref ?? '/contact'} className={buttonVariants({ variant: 'gold', size: 'lg' })}>
              <CalendarCheck className="h-5 w-5" />
              {hero?.ctaLabel ?? 'Plan your visit'}
            </Link>
            <Link
              to="/sermons"
              className={cn(
                'inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-8 text-base font-medium text-ivory transition-colors hover:bg-white/10',
              )}
            >
              <PlayCircle className="h-5 w-5" />
              Watch messages
            </Link>
          </motion.div>

          {/* Service times pill row */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-midnight-200"
          >
            {serviceTimes.map((service, index) => (
              <span key={service.name} className="flex items-center gap-2">
                {index > 0 && <span className="hidden h-1 w-1 rounded-full bg-gold-400 sm:block" />}
                <span className="font-medium text-ivory">{service.day}</span>
                <span className="text-midnight-300">{service.time}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <Link
        to="/about"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs font-medium tracking-widest text-midnight-300 transition-colors hover:text-gold-300 sm:flex"
      >
        EXPLORE
        <ArrowRight className="h-4 w-4 rotate-90" />
      </Link>
    </section>
  )
}
