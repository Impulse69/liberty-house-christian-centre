import { createClient } from '@sanity/client'
import { env } from '@/config/env'

/**
 * Read-only Sanity client.
 * The dataset is public, so no token is needed (and none should ever ship to
 * the browser). `useCdn` serves cached, fast responses from Sanity's CDN.
 */
export const sanityClient = createClient({
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
  apiVersion: env.sanity.apiVersion,
  useCdn: true,
  perspective: 'published',
})
