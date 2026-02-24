import { useId } from 'react'
import type { ReactNode } from 'react'

interface PlatformLogoProps {
  showLabel?: boolean
  className?: string
}

export function PlatformLogo({
  showLabel = true,
  className = '',
}: PlatformLogoProps): ReactNode {
  const gradientId = useId()

  return (
    <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="size-9 shrink-0 rounded-lg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E3BE86" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>
        <rect x="7" y="14" width="50" height="42" rx="12" fill="#1C1917" />
        <rect
          x="7"
          y="14"
          width="50"
          height="42"
          rx="12"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
        />
        <rect
          x="23"
          y="8"
          width="18"
          height="10"
          rx="4"
          fill="#2A2522"
          stroke="#8A6A43"
          strokeWidth="1.5"
        />
        <path
          d="M19 35h26M32 24v22"
          stroke="#F6E8D4"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="24" cy="44" r="2.5" fill="#CA8A04" />
        <circle cx="40" cy="44" r="2.5" fill="#CA8A04" />
      </svg>

      {showLabel ? (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-stone-100">
            Omni Kit
          </span>
          <span className="block truncate text-[11px] text-stone-400">
            All-in-one Tools
          </span>
        </span>
      ) : null}
    </span>
  )
}
