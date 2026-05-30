import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock, MapPin } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Loader } from '@/components/common/Loader'
import { ErrorState } from '@/components/common/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { SanityImage } from '@/components/common/SanityImage'
import { PortableTextRenderer } from '@/components/common/PortableTextRenderer'
import { buttonVariants } from '@/components/ui/Button'
import { useEvent } from '@/hooks/useContent'
import { hasImage } from '@/services/sanity/image'
import { formatDateTime, formatTime } from '@/utils/formatDate'

export function EventDetail() {
  const { slug } = useParams()
  const { data: event, isLoading, isError, refetch } = useEvent(slug)

  if (isLoading) {
    return (
      <div className="pt-32">
        <Loader label="Loading event" />
      </div>
    )
  }

  if (isError) {
    return (
      <Section tone="cream" size="lg" className="pt-32">
        <Container>
          <ErrorState onRetry={() => refetch()} />
        </Container>
      </Section>
    )
  }

  if (!event) {
    return (
      <Section tone="cream" size="lg" className="pt-32">
        <Container>
          <EmptyState
            title="Event not found"
            description="This event may have ended or been removed."
            action={
              <Link to="/events" className={buttonVariants({ variant: 'primary' })}>
                Back to events
              </Link>
            }
          />
        </Container>
      </Section>
    )
  }

  return (
    <>
      <SEO
        title={event.title}
        path={`/events/${slug ?? ''}`}
        description={event.summary ?? `Join us for ${event.title} at Liberty House Christian Centre.`}
        type="article"
      />

      <section className="relative overflow-hidden bg-midnight-950 pb-12 pt-32 sm:pt-40">
        <div className="halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-midnight-200 transition-colors hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" />
            All events
          </Link>
          {event.category && (
            <div className="mt-6">
              <Badge tone="gold">{event.category}</Badge>
            </div>
          )}
          <h1 className="mt-4 max-w-3xl text-3xl text-ivory sm:text-4xl md:text-5xl">
            {event.title}
          </h1>
        </Container>
      </section>

      <Section tone="cream" size="lg">
        <Container className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="order-2 lg:order-1">
            {hasImage(event.image) && (
              <SanityImage
                image={event.image}
                alt={event.title}
                aspect="aspect-[16/9]"
                className="mb-8 rounded-2xl border border-sand shadow-card"
              />
            )}
            {event.summary && (
              <p className="text-lg leading-relaxed text-midnight-700">{event.summary}</p>
            )}
            {event.body ? (
              <article className="mt-6">
                <PortableTextRenderer value={event.body} />
              </article>
            ) : null}
          </div>

          <aside className="order-1 lg:order-2">
            <div className="rounded-2xl border border-sand bg-white p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-midnight-950">Event details</h2>
              <ul className="mt-4 space-y-4 text-sm text-midnight-600">
                {event.startAt && (
                  <li className="flex gap-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                    <span>{formatDateTime(event.startAt)}</span>
                  </li>
                )}
                {event.endAt && (
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                    <span>Ends {formatTime(event.endAt)}</span>
                  </li>
                )}
                {event.location && (
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                    <span>{event.location}</span>
                  </li>
                )}
              </ul>
              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: 'gold', className: 'mt-6 w-full' })}
                >
                  Register / RSVP
                </a>
              )}
            </div>
          </aside>
        </Container>
      </Section>
    </>
  )
}
