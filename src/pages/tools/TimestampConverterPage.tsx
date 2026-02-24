import { useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { InputBox } from '../../components/ui/InputBox'
import { ToolPanel } from '../../components/ui/ToolPanel'

interface TimeSnapshot {
  unixSeconds: string
  isoTime: string
  localTime: string
}

function createCurrentSnapshot(): TimeSnapshot {
  const now = new Date()

  return {
    unixSeconds: Math.floor(now.getTime() / 1000).toString(),
    isoTime: now.toISOString(),
    localTime: now.toLocaleString(),
  }
}

export function TimestampConverterPage(): ReactNode {
  const [unixSeconds, setUnixSeconds] = useState(
    () => createCurrentSnapshot().unixSeconds,
  )
  const [isoTime, setIsoTime] = useState(() => createCurrentSnapshot().isoTime)
  const [localTime, setLocalTime] = useState(
    () => createCurrentSnapshot().localTime,
  )
  const [error, setError] = useState('')

  return (
    <ToolPanel
      title="Timestamp Converter"
      subtitle="Convert Unix timestamps and ISO strings for logs and API debugging."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <FieldLabel>Unix Seconds</FieldLabel>
          <InputBox value={unixSeconds} onChange={setUnixSeconds} />
        </div>
        <div>
          <FieldLabel>ISO DateTime</FieldLabel>
          <InputBox value={isoTime} onChange={setIsoTime} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton
          label="From Unix"
          onClick={() => {
            setError('')
            const numeric = Number.parseInt(unixSeconds, 10)
            if (Number.isNaN(numeric)) {
              setError('Unix value must be a number.')
              return
            }

            const date = new Date(numeric * 1000)
            setIsoTime(date.toISOString())
            setLocalTime(date.toLocaleString())
          }}
        />
        <ActionButton
          label="From ISO"
          tone="neutral"
          onClick={() => {
            setError('')
            const date = new Date(isoTime)
            if (Number.isNaN(date.getTime())) {
              setError('ISO value is invalid.')
              return
            }

            setUnixSeconds(Math.floor(date.getTime() / 1000).toString())
            setLocalTime(date.toLocaleString())
          }}
        />
        <ActionButton
          label="Now"
          tone="neutral"
          onClick={() => {
            const snapshot = createCurrentSnapshot()
            setUnixSeconds(snapshot.unixSeconds)
            setIsoTime(snapshot.isoTime)
            setLocalTime(snapshot.localTime)
            setError('')
          }}
        />
      </div>

      <div className="rounded-xl border border-stone-700 bg-stone-950 p-3">
        <p className="mb-2 text-xs uppercase tracking-wide text-stone-400">Local Time</p>
        <p className="text-sm text-stone-200">{localTime}</p>
      </div>

      <CopyButton value={localTime} label="Copy Local Time" />

      {error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}
    </ToolPanel>
  )
}
