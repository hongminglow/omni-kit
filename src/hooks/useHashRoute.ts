import { useEffect, useState } from 'react'

function readPathFromHash(): string {
  const raw = window.location.hash.replace(/^#/, '')
  if (!raw) {
    return '/'
  }

  return raw.startsWith('/') ? raw : `/${raw}`
}

export function useHashRoute(): [string, (path: string) => void] {
  const [path, setPath] = useState<string>(readPathFromHash)

  useEffect(() => {
    const handleChange = () => {
      setPath(readPathFromHash())
    }

    window.addEventListener('hashchange', handleChange)
    if (!window.location.hash) {
      window.location.hash = '/'
    }

    return () => {
      window.removeEventListener('hashchange', handleChange)
    }
  }, [])

  const navigate = (nextPath: string) => {
    const normalized = nextPath.startsWith('/') ? nextPath : `/${nextPath}`
    window.location.hash = normalized
  }

  return [path, navigate]
}
