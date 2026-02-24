import type { ReactNode } from 'react'

export interface ToolRoute {
  path: string
  name: string
  summary: string
  sectionId: string
  sectionLabel: string
  component: () => ReactNode
}

export interface ToolSection {
  id: string
  label: string
  description: string
}

export interface ToolSectionWithRoutes extends ToolSection {
  routes: ToolRoute[]
}
