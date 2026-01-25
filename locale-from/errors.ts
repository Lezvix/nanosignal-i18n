import { signal } from '@preact/signals-core'

import { localeFrom, browser } from '../index.js'

let localeSettings = signal<'ru' | 'en' | undefined>(undefined)

let notEnd = localeFrom(
  // THROWS to parameter of type '[...Signal<string | undefined>[], Signal<string>]
  browser({ available: ['ru', 'en'] as const }),
  localeSettings
)
console.log(notEnd.value)
