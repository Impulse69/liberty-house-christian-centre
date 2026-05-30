/**
 * Centralised, validated access to environment variables.
 * Throwing early gives a clear message instead of a cryptic runtime failure.
 */
function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env.local and fill it in.`,
    )
  }
  return value
}

export const env = {
  sanity: {
    projectId: requireEnv(import.meta.env.VITE_SANITY_PROJECT_ID, 'VITE_SANITY_PROJECT_ID'),
    dataset: requireEnv(import.meta.env.VITE_SANITY_DATASET, 'VITE_SANITY_DATASET'),
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-10-01',
  },
} as const
