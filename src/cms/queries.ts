/**
 * GROQ queries for every content type.
 * The IMAGE fragment keeps the original asset reference (for the image-url
 * builder) while also projecting the LQIP blur-up + dimensions from metadata.
 */

const IMAGE = /* groq */ `{
  ...,
  "lqip": asset->metadata.lqip,
  "dimensions": asset->metadata.dimensions
}`

export const siteSettingsQuery = /* groq */ `
*[_type == "siteSettings"][0]{
  _id, title, tagline, mission, about, vision,
  logo ${IMAGE},
  favicon ${IMAGE},
  phones, email, poBox, address,
  serviceTimes[]{ name, day, time, note },
  socials[]{ platform, href },
  giving
}`

export const heroBannersQuery = /* groq */ `
*[_type == "heroBanner" && active == true] | order(order asc){
  _id, title, subtitle, ctaLabel, ctaHref, order,
  image ${IMAGE}
}`

export const leadersQuery = /* groq */ `
*[_type == "leader"] | order(order asc, name asc){
  _id, name, role, email, order, featured,
  photo ${IMAGE},
  bio,
  socials[]{ platform, href }
}`

export const featuredLeaderQuery = /* groq */ `
*[_type == "leader" && featured == true] | order(order asc)[0]{
  _id, name, role, email, featured,
  photo ${IMAGE},
  bio,
  socials[]{ platform, href }
}`

export const sermonsQuery = /* groq */ `
*[_type == "sermon"] | order(date desc){
  _id, title, slug, speaker, date, scripture, series, mediaType, videoUrl, summary, tags,
  thumbnail ${IMAGE}
}`

export const sermonBySlugQuery = /* groq */ `
*[_type == "sermon" && slug.current == $slug][0]{
  _id, title, slug, speaker, date, scripture, series, mediaType, videoUrl, summary, tags, body,
  thumbnail ${IMAGE}
}`

export const eventsQuery = /* groq */ `
*[_type == "event"] | order(startAt asc){
  _id, title, slug, startAt, endAt, location, category, summary, registrationLink, featured,
  image ${IMAGE}
}`

export const eventBySlugQuery = /* groq */ `
*[_type == "event" && slug.current == $slug][0]{
  _id, title, slug, startAt, endAt, location, category, summary, registrationLink, featured, body,
  image ${IMAGE}
}`

export const quotesQuery = /* groq */ `
*[_type == "pastorQuote"] | order(coalesce(date, _createdAt) desc){
  _id, quoteText, author, caption, date, featured,
  quoteImage ${IMAGE}
}`

export const galleryQuery = /* groq */ `
*[_type == "galleryImage"] | order(order asc, coalesce(date, _createdAt) desc){
  _id, caption, category, date, order,
  image ${IMAGE}
}`

export const announcementsQuery = /* groq */ `
*[_type == "announcement"
  && (!defined(startDate) || startDate <= now())
  && (!defined(endDate) || endDate >= now())
] | order(priority desc, _createdAt desc){
  _id, title, body, link, startDate, endDate, priority
}`
