export function textToWordSet (text) {
  let words = text
    .toLowerCase()
    // TODO think about apostrophes
    .replace(/[^a-z-]/g, ' ')
    .split(/\s+/)
  words = new Set(words)
  return words
}
