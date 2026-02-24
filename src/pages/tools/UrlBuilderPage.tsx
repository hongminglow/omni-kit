import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { InputBox } from '../../components/ui/InputBox'
import { ToolPanel } from '../../components/ui/ToolPanel'

interface QueryParam {
  id: string
  key: string
  value: string
}

function createParam(key: string, value: string): QueryParam {
  const id =
    crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

  return { id, key, value }
}

export function UrlBuilderPage(): ReactNode {
  const [base, setBase] = useState('https://api.example.com/tools')
  const [params, setParams] = useState<QueryParam[]>([
    createParam('page', '1'),
    createParam('limit', '20'),
  ])

  const finalUrl = useMemo(() => {
    try {
      const url = new URL(base)

      params.forEach((entry) => {
        if (entry.key) {
          url.searchParams.set(entry.key, entry.value)
        }
      })

      return url.toString()
    } catch {
      return 'Invalid base URL'
    }
  }, [base, params])

  return (
    <ToolPanel
      title="URL Builder"
      subtitle="Build API URLs with query params and copy final request links."
    >
      <div>
        <FieldLabel>Base URL</FieldLabel>
        <InputBox
          value={base}
          onChange={setBase}
          placeholder="https://api.example.com/items"
        />
      </div>

      <div className="space-y-2">
        {params.map((entry) => (
          <div key={entry.id} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
            <InputBox
              value={entry.key}
              onChange={(nextValue) => {
                setParams((previous) =>
                  previous.map((item) =>
                    item.id === entry.id ? { ...item, key: nextValue } : item,
                  ),
                )
              }}
              placeholder="key"
            />
            <InputBox
              value={entry.value}
              onChange={(nextValue) => {
                setParams((previous) =>
                  previous.map((item) =>
                    item.id === entry.id ? { ...item, value: nextValue } : item,
                  ),
                )
              }}
              placeholder="value"
            />
            <ActionButton
              label="Remove"
              tone="danger"
              onClick={() => {
                setParams((previous) =>
                  previous.filter((item) => item.id !== entry.id),
                )
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton
          label="Add Param"
          tone="neutral"
          onClick={() => {
            setParams((previous) => [...previous, createParam('', '')])
          }}
        />
        <CopyButton value={finalUrl} label="Copy URL" />
      </div>

      <div className="rounded-xl border border-stone-700 bg-stone-950 p-3">
        <p className="mb-2 text-xs uppercase tracking-wide text-stone-400">Final URL</p>
        <code className="block break-all text-xs text-brandCta">{finalUrl}</code>
      </div>
    </ToolPanel>
  )
}
