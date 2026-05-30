# Liberty House Christian Centre

The official website for **Liberty House Christian Centre** — a family of faith in Tema, Ghana.
_Impacting our generation, giving hope and bringing restoration._

A modern, fast, fully responsive church website with a no‑code content dashboard powered by
[Sanity](https://www.sanity.io). The church admin manages everything — sermons, events, quotes,
gallery, leadership and announcements — without touching code.

---

## Tech stack

| Area        | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | React 18 + Vite + TypeScript                       |
| Styling     | Tailwind CSS v4 (custom design system)             |
| Routing     | React Router v7                                    |
| Data        | TanStack Query + Sanity client (`@sanity/client`)  |
| CMS         | Sanity Studio v5 (in `/studio`)                    |
| Animation   | Framer Motion                                      |
| Images      | Sanity Image CDN (blur‑up, responsive `srcset`)    |
| Deployment  | Vercel (web) · Sanity hosting (studio)             |

## Project structure

```
.
├── src/
│   ├── animations/      Framer Motion variants & transition presets
│   ├── cms/             GROQ queries + typed fetchers (Sanity logic)
│   ├── components/
│   │   ├── ui/          Buttons, Card, Input, Textarea, Modal, Badge, Skeleton, EmptyState…
│   │   ├── common/      SanityImage, SectionHeader, SEO, Loader, ErrorState, ImageGrid…
│   │   ├── cards/       SermonCard, EventCard, LeaderCard, QuoteCard
│   │   ├── layout/      Navbar, Footer, Logo, ScrollToTop, SkipLink
│   │   └── sections/    Home page sections (Hero, FeaturedSermons, CtaBand…)
│   ├── config/          site.config.ts + validated env access
│   ├── hooks/           useContent (React Query), useScrolled, useMediaQuery
│   ├── layouts/         RootLayout (chrome + animated outlet)
│   ├── pages/           Home, About, Vision & Mission, Leadership, Sermons, Events, Gallery,
│   │                    Quotes, Give, Contact, NotFound (+ sermon/event detail)
│   ├── services/sanity/ Sanity client + image URL builder
│   ├── types/           Content type definitions
│   └── utils/           cn, formatDate, video helpers
├── studio/              Sanity Studio (admin dashboard) — own package.json
└── public/              favicon, og image, robots.txt, sitemap.xml
```

---

## Getting started

### Prerequisites

- **Node.js 20.19+ or 22.12+** (the Studio requires this range; Node 25 works too)
- npm

### 1. Install dependencies

```bash
# Web app (repo root)
npm install

# Sanity Studio
cd studio && npm install && cd ..
```

### 2. Environment variables

Copy the example file and fill it in (these values are **public** and safe in the browser):

```bash
cp .env.example .env.local
```

```env
VITE_SANITY_PROJECT_ID=eoo28lss
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-10-01
```

> No secret API tokens are used anywhere. The `production` dataset is public (read‑only),
> so the website reads content straight from Sanity's CDN. **Never commit `.env.local`.**

### 3. Run locally

```bash
# Website  → http://localhost:5173
npm run dev

# Studio   → http://localhost:3333
cd studio && npm run dev
```

The first time you open the Studio it will ask you to log in with the Sanity account that owns
the project.

---

## Managing content (for the church admin)

Open the Studio (locally with `npm run dev` in `/studio`, or the hosted URL after deploying — see
below) and sign in. You can:

- **Site Settings** — church name, tagline, mission, vision, contact details, service times,
  social links and giving info.
- **Hero Banners** — the headline/subtitle/button shown at the top of the home page.
- **Leadership** — add, edit and reorder leader profiles (photo, role, bio). Mark one as
  _featured_ to spotlight them on the home page.
- **Sermons** — title, speaker, scripture, series, video link, summary and notes.
- **Events & Programs** — add/edit/delete events with date, location and details.
- **Pastor Quotes** — type a quote **or upload a quote image** from the pastor; it appears
  automatically on the site.
- **Gallery** — upload and order photos.
- **Announcements** — publish time‑boxed announcements shown as a banner on the home page.

Click **Publish** on any document to make it live. Changes appear on the website within about a
minute (CDN cache).

---

## Build

```bash
npm run build       # type-checks and builds the website to /dist
npm run preview     # preview the production build locally

cd studio
npm run build       # builds the Studio
```

---

## Deployment

### Website → Vercel

1. Push this repo to GitHub (already public).
2. In [Vercel](https://vercel.com), **Add New → Project** and import the repository.
3. Vercel auto‑detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Root directory:** repository root (leave default)
4. Add the environment variables from `.env.local` (Project → Settings → Environment Variables).
5. **Deploy.** A `vercel.json` is included with SPA rewrites and asset caching headers.

### Studio → Sanity hosting

From the `studio/` folder, deploy the admin dashboard to a free `*.sanity.studio` URL:

```bash
cd studio
npx sanity login      # once
npm run deploy        # choose a hostname, e.g. liberty-house
```

This gives the admin a clean login URL such as `https://liberty-house.sanity.studio`.

---

## Custom domain — `libertyhousechristiancentre.com`

After the first Vercel deploy:

1. In Vercel: **Project → Settings → Domains → Add** `libertyhousechristiancentre.com`
   (and `www.libertyhousechristiancentre.com`).
2. At your domain registrar, create these DNS records:

   | Type  | Name  | Value                   |
   | ----- | ----- | ----------------------- |
   | A     | `@`   | `76.76.21.21`           |
   | CNAME | `www` | `cname.vercel-dns.com`  |

   _(Vercel will display the exact values to use; follow what it shows if different.)_
3. Set `www` → apex redirect (or vice‑versa) in Vercel. SSL is issued automatically.
4. The production domains are **already allow‑listed** in the Sanity project's CORS settings.

DNS changes can take from a few minutes up to 48 hours to propagate.

---

## Scripts

| Command            | What it does                                  |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Start the website dev server                  |
| `npm run build`    | Type-check + production build                 |
| `npm run preview`  | Preview the production build                  |
| `npm run lint`     | Run ESLint                                     |
| `npm run format`   | Format with Prettier                          |
| `npm run typecheck`| Type-check without emitting                   |

---

## Accessibility, SEO & performance

- Semantic HTML, skip‑to‑content link, visible focus states, AA‑contrast palette.
- Per‑route meta tags, Open Graph, canonical URLs and `Church` JSON‑LD structured data.
- `robots.txt` + `sitemap.xml`.
- Responsive, lazy‑loaded images served from Sanity's CDN with LQIP blur‑up.
- Respects `prefers-reduced-motion`.

---

Built with care for Liberty House Christian Centre, Tema — Ghana. 🕊️
