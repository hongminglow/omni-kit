import type { ReactNode } from 'react'

interface ToolPanelProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function ToolPanel({
  title,
  subtitle,
  children,
}: ToolPanelProps): ReactNode {
  return (
    <section className="space-y-4 rounded-2xl border border-stone-700/80 bg-stone-900/60 p-5">
      <div>
        <h2 className="text-xl font-semibold text-stone-100">{title}</h2>
        <p className="text-sm text-stone-400">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}
