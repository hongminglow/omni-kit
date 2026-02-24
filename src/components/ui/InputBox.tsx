import type { ReactNode } from 'react'

interface InputBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

export function InputBox({
  value,
  onChange,
  placeholder,
  type = 'text',
}: InputBoxProps): ReactNode {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-brandCta/60"
    />
  )
}
