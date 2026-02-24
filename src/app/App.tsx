import type { ReactNode } from 'react'
import { getSectionedTools, getToolByPath } from './toolRegistry'
import { AppShell } from '../components/layout/AppShell'
import { useHashRoute } from '../hooks/useHashRoute'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'

export default function App(): ReactNode {
  const [path, navigate] = useHashRoute()
  const sectionedTools = getSectionedTools()
  const matchedTool = getToolByPath(path)
  const CurrentToolPage = matchedTool?.component

  const activeTitle = matchedTool ? matchedTool.name : path === '/' ? 'Home' : 'Not Found'

  return (
    <AppShell activePath={path} activeTitle={activeTitle} sections={sectionedTools}>
      {path === '/' ? <HomePage sections={sectionedTools} /> : null}
      {path !== '/' && CurrentToolPage ? <CurrentToolPage /> : null}
      {path !== '/' && !CurrentToolPage ? (
        <NotFoundPage onGoHome={() => navigate('/')} />
      ) : null}
    </AppShell>
  )
}
