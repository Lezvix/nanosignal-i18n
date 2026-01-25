import { signal } from '@preact/signals-core'

import { browser, localeFrom } from '../index.js'

let localeSettings = signal<'en' | 'ru' | undefined>(undefined)

let locale = localeFrom(
  localeSettings,
  browser({ available: ['ru', 'en'] as const })
)
console.log(locale.value)

let string = localeFrom(
  localeSettings,
  browser({ available: ['ru', 'en'], fallback: 'en' })
)
console.log(string.value)
