import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { footerNav, siteConfig } from '@/config/site.config'
import { useSiteData } from '@/hooks/useSiteData'
import { Logo } from './Logo'
import { SocialIcon } from './SocialIcon'

export function Footer() {
  const year = new Date().getFullYear()
  const { logo, tagline, phones, email, poBox, city, country, serviceTimes, socials } = useSiteData()

  return (
    <footer className="relative overflow-hidden bg-midnight-950 text-midnight-200">
      <div className="halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo logo={logo} onDark textClassName="text-ivory" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-midnight-300">
              {tagline}. A family of faith in {siteConfig.foundedCity}, {siteConfig.country}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-midnight-700 text-midnight-200 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  <SocialIcon platform={social.platform} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ivory">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {footerNav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-midnight-300 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ivory">
              Service Times
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              {serviceTimes.map((service) => (
                <li key={service.name} className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.8} />
                  <span>
                    <span className="block font-medium text-ivory">{service.name}</span>
                    <span className="text-midnight-300">
                      {service.day} · {service.time}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ivory">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm">
              {phones.map((phone) => (
                <li key={phone} className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.8} />
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-midnight-300 transition-colors hover:text-gold-300"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.8} />
                <a
                  href={`mailto:${email}`}
                  className="break-all text-midnight-300 transition-colors hover:text-gold-300"
                >
                  {email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.8} />
                <span className="text-midnight-300">
                  {poBox}
                  <br />
                  {city}, {country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-midnight-800 pt-8 text-sm text-midnight-400 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-midnight-500">Impacting our generation · Tema, Ghana</p>
        </div>
      </div>
    </footer>
  )
}
