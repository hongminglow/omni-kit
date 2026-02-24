import type { ReactNode } from 'react'
import { ActionButton } from '../components/ui/ActionButton'

interface NotFoundPageProps {
  onGoHome: () => void
}

export function NotFoundPage({ onGoHome }: NotFoundPageProps): ReactNode {
  return (
    <section className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6">
      <h1 className="text-xl font-semibold text-rose-200">Route not found</h1>
      <p className="mt-1 text-sm text-rose-100/90">
        This feature route does not exist in the current build.
      </p>
      <div className="mt-4">
        <ActionButton label="Go Home" tone="danger" onClick={onGoHome} />
      </div>
    </section>
  )
}
