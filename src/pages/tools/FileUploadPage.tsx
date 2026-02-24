import { useState } from 'react'
import type { ReactNode } from 'react'
import { ToolPanel } from '../../components/ui/ToolPanel'

export function FileUploadPage(): ReactNode {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const totalBytes = files.reduce((total, file) => total + file.size, 0)

  const setFromFileList = (list: FileList | null) => {
    if (!list) {
      return
    }

    setFiles(Array.from(list))
  }

  return (
    <ToolPanel
      title="File Upload"
      subtitle="Drag-and-drop upload area with metadata table and size summary."
    >
      <label
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          setFromFileList(event.dataTransfer.files)
        }}
        className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
          isDragging
            ? 'border-brandCta bg-brandCta/10'
            : 'border-stone-700 bg-stone-950/80 hover:border-brandCta/60'
        }`}
      >
        <p className="text-sm font-semibold text-stone-200">Drop files here</p>
        <p className="mt-1 text-xs text-stone-400">or click to browse local files</p>
        <input
          type="file"
          multiple
          className="sr-only"
          onChange={(event) => setFromFileList(event.target.files)}
        />
      </label>

      <div className="rounded-xl border border-stone-700 bg-stone-950/80 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-stone-200">
            Selected files: {files.length}
          </p>
          <p className="text-sm text-stone-400">
            Total: {(totalBytes / 1024).toFixed(2)} KB
          </p>
        </div>

        {files.length === 0 ? (
          <p className="text-sm text-stone-500">No files selected.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-300">
              <thead>
                <tr className="border-b border-stone-700 text-stone-400">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Type</th>
                  <th className="py-2 pr-3">Size (KB)</th>
                  <th className="py-2">Updated</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr
                    key={`${file.name}-${file.lastModified}`}
                    className="border-b border-stone-800"
                  >
                    <td className="py-2 pr-3">{file.name}</td>
                    <td className="py-2 pr-3">{file.type || 'unknown'}</td>
                    <td className="py-2 pr-3">{(file.size / 1024).toFixed(2)}</td>
                    <td className="py-2">
                      {new Date(file.lastModified).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ToolPanel>
  )
}
