import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Container } from '@/components/ui/Container'
import { buttonVariants } from '@/components/ui/Button'

export function NotFound() {
  return (
    <>
      <SEO title="Page not found" path="/404" />
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-midnight-950">
        <div className="halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative text-center">
          <p className="font-display text-7xl font-semibold text-gold-400 sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl text-ivory sm:text-4xl">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md text-midnight-200">
            The page you’re looking for doesn’t exist or may have moved. Let’s get you back home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className={buttonVariants({ variant: 'gold' })}>
              Back home
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium text-ivory transition-colors hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
