import type { ReactNode } from 'react'
import { Loader } from './Loader'
import { ErrorState } from './ErrorState'

interface AsyncContentProps<T> {
  isLoading: boolean
  isError: boolean
  data: T | undefined | null
  onRetry?: () => void
  loader?: ReactNode
  errorTitle?: string
  empty?: ReactNode
  isEmpty?: (data: T) => boolean
  children: (data: T) => ReactNode
}

/**
 * Declarative wrapper for the loading → error → empty → success lifecycle of a
 * React Query result. Keeps pages focused on layout, not state branching.
 */
export function AsyncContent<T>({
  isLoading,
  isError,
  data,
  onRetry,
  loader,
  errorTitle,
  empty,
  isEmpty,
  children,
}: AsyncContentProps<T>) {
  if (isLoading) return <>{loader ?? <Loader />}</>
  if (isError) return <ErrorState title={errorTitle} onRetry={onRetry} />
  if (data == null || (isEmpty ? isEmpty(data) : false)) return <>{empty ?? null}</>
  return <>{children(data)}</>
}
