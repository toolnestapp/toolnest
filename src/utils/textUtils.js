export function getTextStats(text) {
  const trimmed = text.trim()
  const words = trimmed.length === 0 ? [] : trimmed.split(/\s+/)
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const sentences = trimmed.length === 0 ? 0 : (trimmed.match(/[^.!?]+[.!?]+|\S+$/g) || []).length
  const paragraphs = trimmed.length === 0 ? 0 : trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length
  const lines = text.length === 0 ? 0 : text.split('\n').length
  const readingTimeMinutes = words.length === 0 ? 0 : Math.max(1, Math.round(words.length / 200))

  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes
  }
}

export function toTitleCase(text) {
  const smallWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'the', 'to', 'up', 'yet'])
  return text
    .toLowerCase()
    .split(' ')
    .map((word, i) => {
      if (word.length === 0) return word
      if (i !== 0 && smallWords.has(word)) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export function toSentenceCase(text) {
  const lower = text.toLowerCase()
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase())
}

export function toggleCase(text) {
  return text
    .split('')
    .map((ch) => (ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()))
    .join('')
}
