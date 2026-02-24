import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { InputBox } from '../../components/ui/InputBox'
import { ToolPanel } from '../../components/ui/ToolPanel'
import { buildPassword, scorePassword } from '../../lib/password'

export function PasswordGeneratorPage(): ReactNode {
  const [length, setLength] = useState('16')
  const [lower, setLower] = useState(true)
  const [upper, setUpper] = useState(true)
  const [digits, setDigits] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')

  const strength = useMemo(() => scorePassword(password), [password])

  return (
    <ToolPanel
      title="Password Generator"
      subtitle="Generate secure passwords using browser crypto randomness."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <FieldLabel>Length</FieldLabel>
          <InputBox value={length} onChange={setLength} type="number" />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200">
          <input
            type="checkbox"
            checked={lower}
            onChange={(event) => setLower(event.target.checked)}
          />
          Lowercase
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200">
          <input
            type="checkbox"
            checked={upper}
            onChange={(event) => setUpper(event.target.checked)}
          />
          Uppercase
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200">
          <input
            type="checkbox"
            checked={digits}
            onChange={(event) => setDigits(event.target.checked)}
          />
          Digits
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200">
          <input
            type="checkbox"
            checked={symbols}
            onChange={(event) => setSymbols(event.target.checked)}
          />
          Symbols
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton
          label="Generate Password"
          onClick={() => {
            const parsedLength = Number.parseInt(length, 10)
            const safeLength = Number.isNaN(parsedLength)
              ? 16
              : Math.min(Math.max(parsedLength, 8), 64)

            const generated = buildPassword({
              length: safeLength,
              lower,
              upper,
              digits,
              symbols,
            })

            setPassword(generated)
          }}
        />
        <CopyButton value={password} label="Copy Password" />
      </div>

      <div className="rounded-xl border border-stone-700 bg-stone-950 p-3">
        <p className="mb-2 text-xs uppercase tracking-wide text-stone-400">
          Password Output
        </p>
        <code className="block break-all text-sm text-brandText">
          {password || 'Generate to view result'}
        </code>
      </div>

      <div className="rounded-xl border border-stone-700 bg-stone-950 p-3">
        <p className="text-xs uppercase tracking-wide text-stone-400">Strength</p>
        <p
          className={`text-sm font-semibold ${
            strength === 'strong'
              ? 'text-brandCta'
              : strength === 'medium'
                ? 'text-brandText'
                : 'text-rose-300'
          }`}
        >
          {password ? strength.toUpperCase() : 'N/A'}
        </p>
      </div>
    </ToolPanel>
  )
}
