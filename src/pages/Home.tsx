import { SEO } from '@/components/common/SEO'
import { Hero } from '@/components/sections/Hero'
import { AnnouncementsBanner } from '@/components/sections/AnnouncementsBanner'
import { WelcomeSection } from '@/components/sections/WelcomeSection'
import { FeaturedSermons } from '@/components/sections/FeaturedSermons'
import { PastorSpotlight } from '@/components/sections/PastorSpotlight'
import { UpcomingEvents } from '@/components/sections/UpcomingEvents'
import { QuotesPreview } from '@/components/sections/QuotesPreview'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { CtaBand } from '@/components/sections/CtaBand'
import { contactInfo, siteConfig } from '@/config/site.config'

const churchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: siteConfig.name,
  url: siteConfig.url,
  slogan: siteConfig.tagline,
  email: contactInfo.email,
  telephone: contactInfo.phones[0],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tema',
    addressRegion: 'Greater Accra',
    addressCountry: 'GH',
    postOfficeBoxNumber: 'CO 4959',
  },
}

export function Home() {
  return (
    <>
      <SEO
        path="/"
        description={siteConfig.description}
        jsonLd={churchJsonLd}
      />
      <Hero />
      <AnnouncementsBanner />
      <WelcomeSection />
      <FeaturedSermons />
      <PastorSpotlight />
      <UpcomingEvents />
      <QuotesPreview />
      <GalleryPreview />
      <CtaBand />
    </>
  )
}
