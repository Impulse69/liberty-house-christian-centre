import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { mainNav, siteConfig } from '@/config/site.config'
import { useScrolled } from '@/hooks/useScrolled'
import { buttonVariants } from '@/components/ui/Button'
import { Logo } from './Logo'
import { cn } from '@/utils/cn'

export function Navbar() {
  const scrolled = useScrolled(16)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile drawer on navigation.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const solid = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid
          ? 'border-b border-sand bg-cream/85 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-6 lg:px-8">
        <Logo
          textClassName={solid ? 'text-midnight-950' : 'text-ivory'}
        />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    solid
                      ? 'text-midnight-700 hover:text-midnight-950'
                      : 'text-midnight-100 hover:text-white',
                    isActive && (solid ? 'text-midnight-950' : 'text-white'),
                    isActive &&
                      'after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gold-400',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/give" className={cn(buttonVariants({ variant: 'gold', size: 'sm' }), 'hidden sm:inline-flex')}>
            Give
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden',
              solid ? 'text-midnight-900 hover:bg-midnight-100' : 'text-ivory hover:bg-white/10',
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-sand bg-cream lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {mainNav.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-midnight-50 text-midnight-950'
                          : 'text-midnight-700 hover:bg-midnight-50',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <Link to="/give" className={cn(buttonVariants({ variant: 'gold' }), 'w-full')}>
                  Give to {siteConfig.shortName}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
