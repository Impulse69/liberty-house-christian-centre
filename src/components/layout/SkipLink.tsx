/** Keyboard-accessible skip-to-content link. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-[200] rounded-full bg-midnight-900 px-5 py-2 text-sm font-medium text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  )
}
