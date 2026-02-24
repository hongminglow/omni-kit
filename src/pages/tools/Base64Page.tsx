import { useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { TextArea } from '../../components/ui/TextArea'
import { ToolPanel } from '../../components/ui/ToolPanel'
import { base64ToBytes, bytesToBase64, toBytes } from '../../lib/encoding'

export function Base64Page(): ReactNode {
  const [input, setInput] = useState('Utility payload demo')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  return (
    <ToolPanel
      title="Base64 Encoder / Decoder"
      subtitle="Encode and decode UTF-8 payloads for transport and debugging."
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
          label="Encode"
          onClick={() => {
            setError('')
            try {
              setOutput(bytesToBase64(toBytes(input)))
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : 'Encode failed')
            }
          }}
        />
        <ActionButton
          label="Decode"
          tone="neutral"
          onClick={() => {
            setError('')
            try {
              const decoded = new TextDecoder().decode(base64ToBytes(input.trim()))
              setOutput(decoded)
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
