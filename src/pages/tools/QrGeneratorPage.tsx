import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { InputBox } from '../../components/ui/InputBox'
import { TextArea } from '../../components/ui/TextArea'
import { ToolPanel } from '../../components/ui/ToolPanel'

export function QrGeneratorPage(): ReactNode {
  const [payload, setPayload] = useState('https://example.com/hello')
  const [size, setSize] = useState('280')

  const qrUrl = useMemo(() => {
    const normalized = Number.parseInt(size, 10)
    const finalSize = Number.isNaN(normalized)
      ? 280
      : Math.min(Math.max(normalized, 100), 600)

    return `https://api.qrserver.com/v1/create-qr-code/?size=${finalSize}x${finalSize}&data=${encodeURIComponent(payload)}`
  }, [payload, size])

  return (
    <ToolPanel
      title="QR Generator"
      subtitle="Generate QR images for URLs, app deep links, and text payloads."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <div>
            <FieldLabel>Payload</FieldLabel>
            <TextArea value={payload} onChange={setPayload} rows={6} />
          </div>
          <div>
            <FieldLabel>Size (100-600)</FieldLabel>
            <InputBox value={size} onChange={setSize} />
          </div>
          <div className="flex flex-wrap gap-2">
            <CopyButton value={qrUrl} label="Copy URL" />
            <a
              href={qrUrl}
              download="omni-qr.png"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm font-medium text-stone-200 transition hover:bg-stone-700"
            >
              Download PNG
            </a>
            <ActionButton
              label="Reset"
              tone="neutral"
              onClick={() => {
                setPayload('https://example.com/hello')
                setSize('280')
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-stone-700 bg-stone-950 p-4">
          <img
            src={qrUrl}
            alt="Generated QR"
            className="w-full rounded-lg border border-stone-700"
          />
        </div>
      </div>
    </ToolPanel>
  )
}
