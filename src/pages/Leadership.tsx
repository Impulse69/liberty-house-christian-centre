import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Users } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { AsyncContent } from '@/components/common/AsyncContent'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Avatar } from '@/components/ui/Avatar'
import { SanityImage } from '@/components/common/SanityImage'
import { PortableTextRenderer } from '@/components/common/PortableTextRenderer'
import { LeaderCard } from '@/components/cards/LeaderCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { useLeaders } from '@/hooks/useContent'
import { hasImage } from '@/services/sanity/image'
import type { Leader } from '@/types/content'
import { staggerContainer } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

export function Leadership() {
  const { data, isLoading, isError, refetch } = useLeaders()
  const [selected, setSelected] = useState<Leader | null>(null)

  return (
    <>
      <SEO
        title="Leadership"
        path="/leadership"
        description="Meet the pastoral and leadership team of Liberty House Christian Centre, Tema."
      />
      <PageHeader
        kicker="Our Leadership"
        title="Meet the team"
        description="Servant-hearted leaders shepherding our church family with love and integrity."
      />

      <Section tone="cream" size="lg">
        <Container>
          <AsyncContent
            isLoading={isLoading}
            isError={isError}
            data={data}
            onRetry={() => refetch()}
            isEmpty={(leaders) => leaders.length === 0}
            loader={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            }
            empty={
              <EmptyState
                icon={Users}
                title="Leadership profiles coming soon"
                description="Our leadership team will be introduced here shortly."
              />
            }
          >
            {(leaders) => (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {leaders.map((leader) => (
                  <LeaderCard key={leader._id} leader={leader} onSelect={setSelected} />
                ))}
              </motion.div>
            )}
          </AsyncContent>
        </Container>
      </Section>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} label="Leader profile">
        {selected && (
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-midnight-900">
              {hasImage(selected.photo) ? (
                <SanityImage image={selected.photo} alt={selected.name} className="absolute inset-0" />
              ) : (
                <Avatar name={selected.name} className="absolute inset-0 h-full w-full text-5xl" />
              )}
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl">{selected.name}</h2>
              <p className="mt-1 font-medium text-gold-600">{selected.role}</p>
              {selected.bio ? (
                <div className="mt-4">
                  <PortableTextRenderer value={selected.bio} />
                </div>
              ) : null}
              {selected.email && (
                <a
                  href={`mailto:${selected.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-midnight-700 hover:text-gold-600"
                >
                  <Mail className="h-4 w-4" />
                  {selected.email}
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
