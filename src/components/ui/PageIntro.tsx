import type { ReactNode } from 'react'

interface PageIntroProps {
  badge: string
  title: string
  description: string
}

export function PageIntro({
  badge,
  title,
  description,
}: PageIntroProps): ReactNode {
  return (
    <div className="rounded-2xl border border-brandCta/30 bg-gradient-to-br from-brandCta/20 via-stone-900 to-stone-950 p-6">
      <p className="mb-3 inline-flex rounded-full border border-brandCta/40 bg-brandCta/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brandCta">
        {badge}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-stone-100 md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-stone-300">{description}</p>
    </div>
  )
}
