import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { cn } from '@/utils/cn'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-midnight-600">{children}</p>,
    h2: ({ children }) => <h2 className="mb-3 mt-8 text-2xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-6 text-xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-gold-400 pl-5 font-display text-xl italic text-midnight-800">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-midnight-800">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className="text-gold-700 underline underline-offset-2 transition-colors hover:text-gold-600"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5 text-midnight-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5 text-midnight-600">{children}</ol>
    ),
  },
}

interface PortableTextRendererProps {
  value?: unknown
  className?: string
}

export function PortableTextRenderer({ value, className }: PortableTextRendererProps) {
  if (!Array.isArray(value) || value.length === 0) return null
  return (
    <div className={cn('text-midnight-600', className)}>
      <PortableText value={value as never} components={components} />
    </div>
  )
}
