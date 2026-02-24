import { useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { TextArea } from '../../components/ui/TextArea'
import { ToolPanel } from '../../components/ui/ToolPanel'
import { base64UrlToText } from '../../lib/encoding'

export function JwtDecoderPage(): ReactNode {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik9tbmkgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.signature',
  )
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  return (
    <ToolPanel
      title="JWT Decoder"
      subtitle="Decode JWT header and payload locally. Signature verification is not included."
    >
      <div className="space-y-3">
        <FieldLabel>JWT Token</FieldLabel>
        <TextArea value={token} onChange={setToken} rows={6} />
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton
          label="Decode JWT"
          onClick={() => {
            setError('')

            try {
              const [rawHeader, rawPayload] = token.trim().split('.')
              if (!rawHeader || !rawPayload) {
                throw new Error(
                  'Invalid JWT format. Expected header.payload.signature',
                )
              }

              const decodedHeader = JSON.parse(base64UrlToText(rawHeader))
              const decodedPayload = JSON.parse(base64UrlToText(rawPayload))

              setHeader(JSON.stringify(decodedHeader, null, 2))
              setPayload(JSON.stringify(decodedPayload, null, 2))
            } catch (cause) {
              const message =
                cause instanceof Error ? cause.message : 'Failed to decode JWT'
              setError(message)
              setHeader('')
              setPayload('')
            }
          }}
        />
        <ActionButton
          label="Clear"
          tone="neutral"
          onClick={() => {
            setHeader('')
            setPayload('')
            setError('')
          }}
        />
        <CopyButton value={payload} label="Copy Payload" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <FieldLabel>Header</FieldLabel>
          <TextArea value={header} onChange={setHeader} rows={10} />
        </div>
        <div>
          <FieldLabel>Payload</FieldLabel>
          <TextArea value={payload} onChange={setPayload} rows={10} />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}
    </ToolPanel>
  )
}
