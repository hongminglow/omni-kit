import { useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { TextArea } from '../../components/ui/TextArea'
import { ToolPanel } from '../../components/ui/ToolPanel'

export function UrlEncodeDecodePage(): ReactNode {
  const [input, setInput] = useState('hello world?name=omni kit&mode=dark brown')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  return (
    <ToolPanel
      title="URL Encoder / Decoder"
      subtitle="Encode or decode URL components for safe query and path transport."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <FieldLabel>Input</FieldLabel>
          <TextArea value={input} onChange={setInput} rows={8} />
        </div>
        <div>
          <FieldLabel>Output</FieldLabel>
          <TextArea value={output} onChange={setOutput} rows={8} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton
          label="Encode Component"
          onClick={() => {
            setError('')
            try {
              setOutput(encodeURIComponent(input))
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : 'Encode failed')
            }
          }}
        />
        <ActionButton
          label="Decode Component"
          tone="neutral"
          onClick={() => {
            setError('')
            try {
              setOutput(decodeURIComponent(input))
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : 'Decode failed')
            }
          }}
        />
        <CopyButton value={output} label="Copy Output" />
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}
    </ToolPanel>
  )
}
