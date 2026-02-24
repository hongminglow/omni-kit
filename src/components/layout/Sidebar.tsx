import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ToolSectionWithRoutes } from '../../app/types'
import { PlatformLogo } from '../ui/PlatformLogo'

interface SidebarProps {
  sections: ToolSectionWithRoutes[]
  activePath: string
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

function getInitials(name: string): string {
  const words = name.split(' ')
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase()
}

function Chevron({
  direction,
}: {
  direction: 'up' | 'down' | 'left' | 'right'
}): ReactNode {
  const rotation =
    direction === 'up'
      ? '-rotate-180'
      : direction === 'left'
        ? 'rotate-90'
        : direction === 'right'
          ? '-rotate-90'
          : 'rotate-0'

  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`size-4 transition-transform ${rotation}`}
    >
      <path
        d="M5.5 7.5L10 12l4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sidebar({
  sections,
  activePath,
  isSidebarOpen,
  onToggleSidebar,
}: SidebarProps): ReactNode {
  const initialState = useMemo(() => {
    const state: Record<string, boolean> = {}
    sections.forEach((section) => {
      state[section.id] = false
    })
    return state
  }, [sections])

  const [collapsedSections, setCollapsedSections] =
    useState<Record<string, boolean>>(initialState)

  const flatRoutes = sections.flatMap((section) => section.routes)
  const sectionCount = sections.length

  return (
    <aside
      className={`relative sticky top-0 h-screen shrink-0 border-r border-stone-800/80 bg-stone-950/90 transition-all duration-300 ${
        isSidebarOpen ? 'w-[320px]' : 'w-[88px]'
      }`}
    >
      <button
        type="button"
        onClick={onToggleSidebar}
        className="absolute -right-3 top-1/2 z-20 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-stone-700 bg-stone-900 text-stone-200 shadow-lg shadow-black/30 transition hover:border-brandCta/60"
        aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <Chevron direction={isSidebarOpen ? 'left' : 'right'} />
      </button>

      <div className="flex h-full flex-col">
        <div className="border-b border-stone-800 px-3 py-3">
          <a
            href="#/"
            className={`inline-flex items-center gap-2 overflow-hidden text-brandText transition ${
              isSidebarOpen ? 'w-auto' : 'w-full justify-center'
            }`}
          >
            <PlatformLogo showLabel={isSidebarOpen} />
          </a>

          {isSidebarOpen ? (
            <p className="mt-2 text-xs text-stone-400">
              {sectionCount} sections • {flatRoutes.length} tools
            </p>
          ) : null}
        </div>

        {isSidebarOpen ? (
          <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
            {sections.map((section) => {
              const isCollapsed = collapsedSections[section.id]

              return (
                <section key={section.id} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCollapsedSections((previous) => ({
                        ...previous,
                        [section.id]: !previous[section.id],
                      }))
                    }}
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-left transition hover:bg-stone-800/60"
                  >
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-300">
                        {section.label}
                      </p>
                    </div>
                    <span className="text-stone-400">
                      <Chevron direction={isCollapsed ? 'down' : 'up'} />
                    </span>
                  </button>

                  {!isCollapsed ? (
                    <nav className="space-y-1">
                      {section.routes.map((tool) => {
                        const isActive = activePath === tool.path

                        return (
                          <a
                            key={tool.path}
                            href={`#${tool.path}`}
                            className={`block rounded-lg border px-3 py-2 transition ${
                              isActive
                                ? 'border-brandCta/60 bg-brandCta/10 text-brandText'
                                : 'border-stone-700 bg-stone-950/60 text-stone-300 hover:border-brandCta/40'
                            }`}
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                              {tool.name}
                            </p>
                          </a>
                        )
                      })}
                    </nav>
                  ) : null}
                </section>
              )
            })}
          </div>
        ) : (
          <nav className="flex-1 space-y-2 overflow-y-auto px-2 py-4">
            {flatRoutes.map((tool) => {
              const isActive = activePath === tool.path

              return (
                <a
                  key={tool.path}
                  href={`#${tool.path}`}
                  title={tool.name}
                  className={`flex items-center justify-center rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                    isActive
                      ? 'border-brandCta/70 bg-brandCta/20 text-brandText'
                      : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-brandCta/40'
                  }`}
                >
                  {getInitials(tool.name)}
                </a>
              )
            })}
          </nav>
        )}
      </div>
    </aside>
  )
}
