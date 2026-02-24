import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { TextArea } from '../../components/ui/TextArea'
import { ToolPanel } from '../../components/ui/ToolPanel'
import { sha256 } from '../../lib/hash'

export function HashGeneratorPage(): ReactNode {
  const [input, setInput] = useState('hash this value')
  const [hashValue, setHashValue] = useState('')

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (!input) {
        setHashValue('')
        return
      }

      const hashed = await sha256(input)
      if (!cancelled) {
        setHashValue(hashed)
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [input])

  return (
    <ToolPanel
      title="Hash Generator"
      subtitle="Generate SHA-256 fingerprint for text payload integrity checks."
    >
      <div className="space-y-3">
        <FieldLabel>Input text</FieldLabel>
        <TextArea value={input} onChange={setInput} rows={5} />
      </div>

      <div className="rounded-xl border border-stone-700 bg-stone-950 p-3">
        <p className="mb-2 text-xs uppercase tracking-wide text-stone-400">SHA-256</p>
        <code className="block break-all text-xs text-brandCta">
          {hashValue || 'n/a'}
        </code>
      </div>

      <CopyButton value={hashValue} label="Copy Hash" />
    </ToolPanel>
  )
}
