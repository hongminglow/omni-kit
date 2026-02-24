import { useState } from 'react'
import type { ReactNode } from 'react'
import { copyTextToClipboard } from '../../lib/clipboard'
import { ActionButton } from './ActionButton'

interface CopyButtonProps {
  value: string
  label?: string
  tone?: 'primary' | 'neutral'
}

export function CopyButton({
  value,
  label = 'Copy',
  tone = 'neutral',
}: CopyButtonProps): ReactNode {
  const [state, setState] = useState<'idle' | 'checked' | 'failed'>('idle')

  const currentLabel =
    state === 'idle' ? label : state === 'checked' ? 'Checked' : 'Failed'

  return (
    <ActionButton
      label={currentLabel}
      tone={state === 'failed' ? 'danger' : tone}
      onClick={() => {
        void (async () => {
          const ok = await copyTextToClipboard(value)
          setState(ok ? 'checked' : 'failed')
          window.setTimeout(() => {
            setState('idle')
          }, 1200)
        })()
      }}
    />
  )
}
