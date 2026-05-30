import type { Transition } from 'framer-motion'

/** Shared easing + spring presets for consistent, premium motion. */
export const easeOutSpring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.8,
}

export const smooth: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}

export const smoothFast: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
}

/** Default viewport config for scroll-triggered reveals. */
export const revealViewport = { once: true, amount: 0.2 } as const
