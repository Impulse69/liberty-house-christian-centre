// One-off utility to rasterize the SVG logo into PWA/app icons.
// Requires sharp:  npm i -D sharp   (then)  node scripts/generate-icons.mjs
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const svg = readFileSync(resolve(root, 'public/favicon.svg'))
const out = (name) => resolve(root, 'public', name)
const BG = { r: 21, g: 32, b: 58, alpha: 1 } // midnight-900 #15203a

async function plain(name, size) {
  await sharp(svg, { density: 512 })
    .resize(size, size, { fit: 'contain', background: BG })
    .flatten({ background: BG })
    .png()
    .toFile(out(name))
  console.log('wrote', name)
}

async function maskable(name, size) {
  const inner = Math.round(size * 0.72)
  const mark = await sharp(svg, { density: 512 })
    .resize(inner, inner, { fit: 'contain', background: BG })
    .png()
    .toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(out(name))
  console.log('wrote', name)
}

await plain('apple-touch-icon.png', 180)
await plain('pwa-192.png', 192)
await plain('pwa-512.png', 512)
await maskable('pwa-maskable-512.png', 512)
