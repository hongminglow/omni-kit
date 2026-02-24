export function parseCsv(input: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let cursor = 0
  let inQuotes = false

  while (cursor < input.length) {
    const char = input[cursor]

    if (char === '"') {
      if (inQuotes && input[cursor + 1] === '"') {
        cell += '"'
        cursor += 2
        continue
      }

      inQuotes = !inQuotes
      cursor += 1
      continue
    }

    if (!inQuotes && char === ',') {
      row.push(cell)
      cell = ''
      cursor += 1
      continue
    }

    if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && input[cursor + 1] === '\n') {
        cursor += 1
      }

      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
      cursor += 1
      continue
    }

    cell += char
    cursor += 1
  }

  row.push(cell)
  if (row.some((value) => value.length > 0) || rows.length === 0) {
    rows.push(row)
  }

  return rows
}
