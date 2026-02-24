import type { ReactNode } from 'react'

export function FieldLabel({ children }: { children: ReactNode }): ReactNode {
  return (
    <label className="mb-1 block text-sm font-medium text-stone-300">{children}</label>
  )
}
