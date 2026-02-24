import { useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { FieldLabel } from '../../components/ui/FieldLabel'
import { TextArea } from '../../components/ui/TextArea'
import { ToolPanel } from '../../components/ui/ToolPanel'
import { parseCsv } from '../../lib/csv'

const DEFAULT_CSV = `name,email,role
Alex,alex@company.com,Admin
Mina,mina@company.com,Editor
Jordan,jordan@company.com,Viewer`

export function CsvViewerPage(): ReactNode {
  const [input, setInput] = useState(DEFAULT_CSV)
  const [rows, setRows] = useState<string[][]>(parseCsv(DEFAULT_CSV))

  return (
    <ToolPanel
      title="CSV Viewer"
      subtitle="Parse raw CSV text into structured table rows for data review."
    >
      <div className="space-y-3">
        <FieldLabel>CSV Input</FieldLabel>
        <TextArea value={input} onChange={setInput} rows={8} />
        <ActionButton
          label="Parse CSV"
          onClick={() => {
            setRows(parseCsv(input))
          }}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-700 bg-stone-950">
        <table className="min-w-full text-left text-sm text-stone-300">
          <thead>
            <tr className="border-b border-stone-700 bg-stone-900">
              {(rows[0] ?? []).map((header, index) => (
                <th key={`${header}-${index}`} className="px-3 py-2 font-medium text-stone-200">
                  {header || `Column ${index + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="border-b border-stone-800">
                {(rows[0] ?? []).map((_, cellIndex) => (
                  <td key={`cell-${rowIndex}-${cellIndex}`} className="px-3 py-2">
                    {row[cellIndex] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ToolPanel>
  )
}
