import type { ReactNode } from 'react'
import type { ToolSectionWithRoutes } from '../app/types'
import { PageIntro } from '../components/ui/PageIntro'

interface HomePageProps {
  sections: ToolSectionWithRoutes[]
}

export function HomePage({ sections }: HomePageProps): ReactNode {
  return (
    <section className="space-y-6">
      <PageIntro
        badge="Utility Platform"
        title="Omni Kit Utility Showcase"
        description="Route-based toolkit for common web app utilities. Every tool is isolated in its own page so teams can demo, validate, and integrate quickly."
      />

      {sections.map((section) => (
        <section key={section.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-100">{section.label}</h2>
            <p className="text-xs uppercase tracking-wide text-stone-400">
              {section.routes.length} tools
            </p>
          </div>
          <p className="text-sm text-stone-400">{section.description}</p>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {section.routes.map((tool) => (
              <a
                key={tool.path}
                href={`#${tool.path}`}
                className="group rounded-2xl border border-stone-700/70 bg-stone-900/60 p-5 transition duration-200 hover:border-brandCta/60 hover:bg-stone-900"
              >
                <p className="mb-3 inline-flex rounded-full border border-stone-600 px-3 py-1 text-xs uppercase tracking-wide text-stone-300">
                  {section.label}
                </p>
                <h3 className="text-lg font-semibold text-stone-100">{tool.name}</h3>
                <p className="mt-2 text-sm text-stone-400">{tool.summary}</p>
                <span className="mt-4 inline-block text-sm font-medium text-brandCta">
                  Open tool <span aria-hidden="true">-&gt;</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </section>
  )
}
