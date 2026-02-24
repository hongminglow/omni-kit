const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.?/\\|'

export interface PasswordOptions {
  length: number
  lower: boolean
  upper: boolean
  digits: boolean
  symbols: boolean
}

export function buildPassword(options: PasswordOptions): string {
  const pools: string[] = []

  if (options.lower) {
    pools.push(LOWER)
  }
  if (options.upper) {
    pools.push(UPPER)
  }
  if (options.digits) {
    pools.push(DIGITS)
  }
  if (options.symbols) {
    pools.push(SYMBOLS)
  }

  if (pools.length === 0) {
    return ''
  }

  const charset = pools.join('')
  const password: string[] = []
  const randomValues = new Uint32Array(options.length)
  crypto.getRandomValues(randomValues)

  for (let index = 0; index < options.length; index += 1) {
    const randomIndex = randomValues[index] % charset.length
    password.push(charset[randomIndex])
  }

  return password.join('')
}

export function scorePassword(value: string): 'weak' | 'medium' | 'strong' {
  let score = 0
  if (value.length >= 12) {
    score += 1
  }
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) {
    score += 1
  }
  if (/\d/.test(value)) {
    score += 1
  }
  if (/[^a-zA-Z0-9]/.test(value)) {
    score += 1
  }

  if (score <= 1) {
    return 'weak'
  }
  if (score <= 3) {
    return 'medium'
  }

  return 'strong'
}
