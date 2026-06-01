// Generates favicon / PWA app icons / social image from the church logo.
// Usage:  npm i -D sharp  &&  node scripts/generate-icons.mjs <path-to-logo.png>
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const logoPath = process.argv[2]
if (!logoPath) {
  console.error('Provide a path to the logo image as the first argument.')
  process.exit(1)
}
const out = (name) => resolve(root, 'public', name)
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

async function onWhite(name, size) {
  await sharp(logoPath)
    .resize(size, size, { fit: 'contain', background: WHITE })
    .flatten({ background: WHITE })
    .png()
    .toFile(out(name))
  console.log('wrote', name)
}

async function maskable(name, size) {
  const inner = Math.round(size * 0.8)
  const mark = await sharp(logoPath)
    .resize(inner, inner, { fit: 'contain', background: WHITE })
    .png()
    .toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(out(name))
  console.log('wrote', name)
}

async function ogImage() {
  const size = 360
  const logo = await sharp(logoPath).resize(size, size, { fit: 'contain' }).png().toBuffer()
  const bg = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0c1426"/><stop offset="1" stop-color="#1f2b4d"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.15" r="0.8">
          <stop stop-color="#bd8b2a" stop-opacity="0.22"/><stop offset="1" stop-color="#bd8b2a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <rect width="1200" height="630" fill="url(#glow)"/>
      <text x="600" y="500" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="700" fill="#fffdf9">Liberty House Christian Centre</text>
      <text x="600" y="556" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="27" fill="#e2c05c" letter-spacing="1.5">Tema, Ghana &#183; &#8230;socially significant</text>
    </svg>`,
  )
  await sharp(bg)
    .composite([{ input: logo, top: 70, left: Math.round((1200 - size) / 2) }])
    .png()
    .toFile(out('og-image.png'))
  console.log('wrote og-image.png')
}

await onWhite('favicon-16.png', 16)
await onWhite('favicon-32.png', 32)
await onWhite('favicon-48.png', 48)
await onWhite('apple-touch-icon.png', 180)
await onWhite('pwa-192.png', 192)
await onWhite('pwa-512.png', 512)
await maskable('pwa-maskable-512.png', 512)
await ogImage()
