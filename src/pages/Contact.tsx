import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { SocialIcon } from '@/components/layout/SocialIcon'
import { contactInfo, serviceTimes, socialLinks } from '@/config/site.config'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Website enquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    )
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <SEO
        title="Contact / Visit Us"
        path="/contact"
        description="Get in touch with Liberty House Christian Centre in Tema, Ghana — we'd love to hear from you."
      />
      <PageHeader
        kicker="Get In Touch"
        title="Contact & visit us"
        description="We'd love to hear from you. Reach out, or come and worship with us in Tema."
      />

      <Section tone="cream" size="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
            >
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl">
                Reach out
              </motion.h2>
              <motion.ul variants={fadeInUp} className="mt-6 space-y-5">
                {contactInfo.phones.map((phone) => (
                  <li key={phone} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight-900 text-gold-300">
                      <Phone className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-sm text-midnight-500">Call us</p>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="font-medium text-midnight-900 hover:text-gold-600"
                      >
                        {phone}
                      </a>
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight-900 text-gold-300">
                    <Mail className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-sm text-midnight-500">Email us</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="font-medium text-midnight-900 hover:text-gold-600"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight-900 text-gold-300">
                    <MapPin className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-sm text-midnight-500">Postal address</p>
                    <p className="font-medium text-midnight-900">{contactInfo.poBox}</p>
                    <p className="text-sm text-midnight-500">
                      {contactInfo.city}, {contactInfo.country}
                    </p>
                  </div>
                </li>
              </motion.ul>

              <motion.div variants={fadeInUp} className="mt-8 rounded-2xl border border-sand bg-white p-6 shadow-soft">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-midnight-900">
                  Service times
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-midnight-600">
                  {serviceTimes.map((service) => (
                    <li key={service.name} className="flex justify-between gap-4">
                      <span>{service.name}</span>
                      <span className="font-medium text-midnight-900">
                        {service.day} · {service.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-white text-midnight-700 transition-colors hover:border-gold-400 hover:text-gold-600"
                  >
                    <SocialIcon platform={social.platform} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
            >
              <div className="rounded-3xl border border-sand bg-white p-7 shadow-card sm:p-9">
                <h2 className="text-2xl">Send us a message</h2>
                <p className="mt-2 text-sm text-midnight-500">
                  Fill in the form and we’ll get back to you as soon as we can.
                </p>
                {sent ? (
                  <div className="mt-6 rounded-2xl border border-gold-200 bg-gold-50 p-5 text-sm text-midnight-700">
                    Thank you! Your email app should now be open with your message ready to send. If
                    not, email us directly at{' '}
                    <a className="font-semibold text-gold-700" href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                    .
                  </div>
                ) : (
                  <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                    <Input
                      label="Full name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                    />
                    <Input
                      label="Email address"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                    />
                    <Textarea
                      label="Message"
                      required
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="How can we pray for you or help you?"
                    />
                    <Button type="submit" variant="primary" className="w-full">
                      <Send className="h-4 w-4" />
                      Send message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="mt-12 overflow-hidden rounded-3xl border border-sand shadow-card"
          >
            <iframe
              title="Map of Tema, Ghana"
              src="https://www.google.com/maps?q=Tema,Ghana&output=embed"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
