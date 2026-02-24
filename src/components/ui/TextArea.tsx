import type { ReactNode } from 'react'

interface TextAreaProps {
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
}

export function TextArea({
  value,
  onChange,
  rows = 8,
  placeholder,
}: TextAreaProps): ReactNode {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-brandCta/60"
    />
  )
}
