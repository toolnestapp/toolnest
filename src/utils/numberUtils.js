export function isValidNumber(value) {
  if (value === '' || value === null || value === undefined) return false
  return !Number.isNaN(Number(value))
}

export function formatNumber(value, decimals = 2) {
  if (!Number.isFinite(value)) return '—'
  const rounded = Math.round(value * 10 ** decimals) / 10 ** decimals
  return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals })
}

export function gcd(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    ;[a, b] = [b, a % b]
  }
  return a || 1
}
