import { browser } from '../index.js'

function test(locale: 'en' | 'ru'): void {
  console.log(locale)
}

let strict = browser({
  available: ['ru', 'en'] as const
})
test(strict.value)

let fallback = browser({
  available: ['ru', 'fr'] as const,
  fallback: 'fr'
})
console.log(fallback.value)

let string = browser({
  available: ['ru', 'fr'],
  fallback: 'fr'
})
console.log(string.value)
