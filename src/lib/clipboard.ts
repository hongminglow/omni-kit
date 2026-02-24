export async function copyTextToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }

    const area = document.createElement('textarea')
    area.value = value
    area.style.position = 'fixed'
    area.style.left = '-9999px'
    document.body.appendChild(area)
    area.select()
    const success = document.execCommand('copy')
    document.body.removeChild(area)
    return success
  } catch {
    return false
  }
}
