import { useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { TextArea } from '../../components/ui/TextArea'
import { ToolPanel } from '../../components/ui/ToolPanel'

export function JsonFormatterPage(): ReactNode {
  const [input, setInput] = useState(`{
  "team": "omni",
  "enabled": true,
  "tools": ["qr", "upload"]
}`)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Invalid JSON')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Invalid JSON')
    }
  }

  return (
    <ToolPanel
      title="JSON Formatter"
      subtitle="Format, minify, validate, and copy JSON payloads for API work."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <FieldLabel>Input JSON</FieldLabel>
          <TextArea value={input} onChange={setInput} rows={14} />
        </div>
        <div>
          <FieldLabel>Output</FieldLabel>
          <TextArea value={output} onChange={setOutput} rows={14} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton label="Format" onClick={formatJson} />
        <ActionButton label="Minify" tone="neutral" onClick={minifyJson} />
        <ActionButton
          label="Validate"
          tone="neutral"
          onClick={() => {
            try {
              JSON.parse(input)
              setError('JSON is valid.')
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : 'Invalid JSON')
            }
          }}
        />
        <CopyButton value={output} label="Copy Output" />
      </div>

      {error ? (
        <div className="rounded-xl border border-stone-700 bg-stone-950 p-3 text-sm text-stone-300">
          {error}
        </div>
      ) : null}
    </ToolPanel>
  )
}
