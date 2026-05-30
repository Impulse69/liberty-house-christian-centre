/**
 * Centralised access to Sanity connection settings.
 *
 * These values are PUBLIC (the project ID is visible in every browser request
 * and is not a secret). Environment variables take precedence when provided;
 * otherwise we fall back to the project's known public defaults so the app
 * builds and runs even if env vars are not configured on the host.
 */
const FALLBACK = {
  projectId: 'eoo28lss',
  dataset: 'production',
  apiVersion: '2024-10-01',
} as const

export const env = {
  sanity: {
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || FALLBACK.projectId,
    dataset: import.meta.env.VITE_SANITY_DATASET || FALLBACK.dataset,
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || FALLBACK.apiVersion,
  },
} as const
