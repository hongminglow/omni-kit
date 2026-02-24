export function toBytes(value: string): Uint8Array {
  return new TextEncoder().encode(value)
}

export function bytesToBase64(bytes: Uint8Array): string {
  const binary = Array.from(bytes)
    .map((value) => String.fromCharCode(value))
    .join('')
  return btoa(binary)
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

export function base64UrlToText(segment: string): string {
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    '=',
  )

  return new TextDecoder().decode(base64ToBytes(padded))
}
