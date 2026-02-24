import type { ReactNode } from 'react'

interface ActionButtonProps {
  label: string
  onClick?: () => void
  tone?: 'primary' | 'neutral' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  leading?: ReactNode
}

export function ActionButton({
  label,
  onClick,
  tone = 'primary',
  type = 'button',
  disabled = false,
  leading,
}: ActionButtonProps): ReactNode {
  const baseClass =
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition duration-200 focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60'

  const toneClass =
    tone === 'primary'
      ? 'border-brandCta/60 bg-brandCta/20 text-brandText hover:bg-brandCta/30 focus-visible:ring-brandCta/70'
      : tone === 'danger'
        ? 'border-rose-500/40 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20 focus-visible:ring-rose-400/70'
        : 'border-stone-600 bg-stone-800 text-stone-200 hover:bg-stone-700 focus-visible:ring-stone-400/70'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${toneClass}`}
    >
      {leading}
      {label}
    </button>
  )
}
