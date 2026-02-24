import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { TextArea } from '../../components/ui/TextArea'
import { ToolPanel } from '../../components/ui/ToolPanel'
import { createLineDiff } from '../../lib/diff'

export function TextDiffPage(): ReactNode {
  const [left, setLeft] = useState('line 1\\nline 2\\nline 3')
  const [right, setRight] = useState('line 1\\nline 2 updated\\nline 3\\nline 4')

  const diff = useMemo(() => createLineDiff(left, right), [left, right])

  const statusColor = {
    same: 'text-stone-300',
    changed: 'text-brandCta',
    added: 'text-brandText',
    removed: 'text-rose-300',
  }

  return (
    <ToolPanel
      title="Text Diff"
      subtitle="Line-based compare view for drafts, changelogs, and content reviews."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <FieldLabel>Left text</FieldLabel>
          <TextArea value={left} onChange={setLeft} rows={10} />
        </div>
        <div>
          <FieldLabel>Right text</FieldLabel>
          <TextArea value={right} onChange={setRight} rows={10} />
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-stone-700 bg-stone-950 p-3">
        {diff.map((line, index) => (
          <div
            key={`diff-${index}`}
            className={`grid gap-3 rounded-lg border border-stone-800 p-2 md:grid-cols-2 ${statusColor[line.status]}`}
          >
            <code className="block whitespace-pre-wrap text-xs">{line.left || ' '}</code>
            <code className="block whitespace-pre-wrap text-xs">{line.right || ' '}</code>
          </div>
        ))}
      </div>
    </ToolPanel>
  )
}
