import { useState } from 'react'
import type { ReactNode } from 'react'
import type { ToolSectionWithRoutes } from '../../app/types'
import { PlatformLogo } from '../ui/PlatformLogo'
import { Sidebar } from './Sidebar'

interface AppShellProps {
  activePath: string
  activeTitle: string
  sections: ToolSectionWithRoutes[]
  children: ReactNode
}

export function AppShell({
  activePath,
  activeTitle,
  sections,
  children,
}: AppShellProps): ReactNode {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="relative min-h-screen overflow-hidden bg-brandBg text-brandText">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 left-24 h-[26rem] w-[26rem] rounded-full bg-brandCta/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-stone-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <Sidebar
          sections={sections}
          activePath={activePath}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((previous) => !previous)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-stone-800/80 bg-stone-950/85 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <PlatformLogo showLabel={false} />
                <div>
                <p className="text-xs uppercase tracking-[0.18em] text-stone-400">
                  Utility Route
                </p>
                <h1 className="text-base font-semibold text-stone-100 md:text-lg">
                  {activeTitle}
                </h1>
                </div>
              </div>
              <a
                href="#/"
                className={`inline-flex cursor-pointer items-center rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  activePath === '/'
                    ? 'border-brandCta/60 bg-brandCta/10 text-brandText'
                    : 'border-stone-700 bg-stone-900 text-stone-200 hover:border-brandCta/60'
                }`}
              >
                All Tools
              </a>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  )
}
