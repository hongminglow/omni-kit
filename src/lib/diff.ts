export interface DiffLine {
  left: string
  right: string
  status: 'same' | 'changed' | 'added' | 'removed'
}

export function createLineDiff(leftText: string, rightText: string): DiffLine[] {
  const leftLines = leftText.split('\n')
  const rightLines = rightText.split('\n')
  const length = Math.max(leftLines.length, rightLines.length)

  const lines: DiffLine[] = []
  for (let index = 0; index < length; index += 1) {
    const left = leftLines[index] ?? ''
    const right = rightLines[index] ?? ''

    if (left === right) {
      lines.push({ left, right, status: 'same' })
    } else if (!left && right) {
      lines.push({ left, right, status: 'added' })
    } else if (left && !right) {
      lines.push({ left, right, status: 'removed' })
    } else {
      lines.push({ left, right, status: 'changed' })
    }
  }

  return lines
}
