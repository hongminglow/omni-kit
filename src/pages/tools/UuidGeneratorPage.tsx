import { useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { ToolPanel } from '../../components/ui/ToolPanel'

export function UuidGeneratorPage(): ReactNode {
  const [items, setItems] = useState<string[]>([])

  const generateUuid = () => {
    const id = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

    setItems((previous) => [id, ...previous].slice(0, 16))
  }

  return (
    <ToolPanel
      title="UUID Generator"
      subtitle="Generate unique IDs for entities, sessions, and identifiers."
    >
      <ActionButton label="Generate UUID" onClick={generateUuid} />

      <ul className="space-y-2 rounded-xl border border-stone-700 bg-stone-950 p-3">
        {items.length === 0 ? (
          <li className="text-sm text-stone-500">No UUID generated yet.</li>
        ) : (
          items.map((item) => (
            <li
              key={item}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-stone-800 bg-stone-900 px-3 py-2"
            >
              <code className="text-xs text-stone-200">{item}</code>
              <CopyButton value={item} />
            </li>
          ))
        )}
      </ul>
    </ToolPanel>
  )
}
