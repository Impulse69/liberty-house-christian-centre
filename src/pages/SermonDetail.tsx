import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, User } from 'lucide-react'
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
import { useSermon } from '@/hooks/useContent'
import { hasImage } from '@/services/sanity/image'
import { formatDate } from '@/utils/formatDate'
import { getEmbedUrl } from '@/utils/video'

export function SermonDetail() {
  const { slug } = useParams()
  const { data: sermon, isLoading, isError, refetch } = useSermon(slug)

  if (isLoading) {
    return (
      <div className="pt-32">
        <Loader label="Loading sermon" />
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

  if (!sermon) {
    return (
      <Section tone="cream" size="lg" className="pt-32">
        <Container>
          <EmptyState
            title="Sermon not found"
            description="This message may have been moved or removed."
            action={
              <Link to="/sermons" className={buttonVariants({ variant: 'primary' })}>
                Back to sermons
              </Link>
            }
          />
        </Container>
      </Section>
    )
  }

  const embed = getEmbedUrl(sermon.videoUrl)

  return (
    <>
      <SEO
        title={sermon.title}
        path={`/sermons/${slug ?? ''}`}
        description={sermon.summary ?? `A message from ${sermon.speaker ?? 'Liberty House'}.`}
        type="article"
      />

      <section className="relative overflow-hidden bg-midnight-950 pb-12 pt-32 sm:pt-40">
        <div className="halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Link
            to="/sermons"
            className="inline-flex items-center gap-2 text-sm font-medium text-midnight-200 transition-colors hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" />
            All sermons
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {sermon.series && <Badge tone="gold">{sermon.series}</Badge>}
            {sermon.scripture && <Badge tone="midnight">{sermon.scripture}</Badge>}
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl text-ivory sm:text-4xl md:text-5xl">
            {sermon.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-midnight-200">
            {sermon.speaker && (
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-gold-400" />
                {sermon.speaker}
              </span>
            )}
            {sermon.date && (
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gold-400" />
                {formatDate(sermon.date)}
              </span>
            )}
          </div>
        </Container>
      </section>

      <Section tone="cream" size="lg">
        <Container className="max-w-3xl">
          {embed ? (
            <div className="aspect-video overflow-hidden rounded-2xl border border-sand bg-midnight-950 shadow-card">
              <iframe
                src={embed}
                title={sermon.title}
                className="h-full w-full"
                allow="accelerator; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            hasImage(sermon.thumbnail) && (
              <SanityImage
                image={sermon.thumbnail}
                alt={sermon.title}
                aspect="aspect-video"
                className="rounded-2xl border border-sand shadow-card"
              />
            )
          )}

          {sermon.summary && (
            <p className="mt-8 text-lg leading-relaxed text-midnight-700">{sermon.summary}</p>
          )}

          {sermon.body ? (
            <article className="mt-6">
              <PortableTextRenderer value={sermon.body} />
            </article>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
