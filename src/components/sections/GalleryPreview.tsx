import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/common/SectionHeader'
import { ImageGrid } from '@/components/common/ImageGrid'
import { buttonVariants } from '@/components/ui/Button'
import { useGallery } from '@/hooks/useContent'
import { fadeIn } from '@/animations/variants'
import { revealViewport } from '@/animations/transitions'

export function GalleryPreview() {
  const { data, isLoading } = useGallery()
  const images = data?.slice(0, 6) ?? []

  if (isLoading || images.length === 0) return null

  return (
    <Section tone="white" size="lg">
      <Container>
        <SectionHeader
          kicker="Life Together"
          title="Moments from our family"
          description="A glimpse into worship, fellowship and the things God is doing among us."
        />
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mt-12"
        >
          <ImageGrid images={images} />
        </motion.div>
        <div className="mt-10 flex justify-center">
          <Link to="/gallery" className={buttonVariants({ variant: 'outline' })}>
            View full gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}
