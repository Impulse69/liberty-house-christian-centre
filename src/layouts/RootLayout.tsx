import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SkipLink } from '@/components/layout/SkipLink'
import { DynamicFavicon } from '@/components/common/DynamicFavicon'
import { pageTransition } from '@/animations/variants'

/** Animates the routed page without remounting the persistent chrome. */
function AnimatedOutlet() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <ScrollToTop />
      <DynamicFavicon />
      <Navbar />
      <main id="main" className="flex-1">
        <AnimatedOutlet />
      </main>
      <Footer />
    </div>
  )
}
