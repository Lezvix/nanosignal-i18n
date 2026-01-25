import { delay } from 'nanodelay'
import { signal } from '@preact/signals-core'
import { deepStrictEqual, equal } from 'node:assert'
import { test } from 'node:test'

import { localeFrom } from '../index.js'

type Locale = 'en' | 'fr' | 'ru'

test('subscribes to stores before store with locale', async () => {
  let a = signal<Locale | undefined>(undefined)
  let b = signal<Locale | undefined>(undefined)
  let c = signal<Locale | undefined>('en')
  let d = signal<Locale | undefined>(undefined)
  let e = signal<Locale>('ru')

  let locale = localeFrom(a, b, c, d, e)
  let unbind = locale.subscribe(() => {})

  equal(locale.value, 'en')

  b.value = 'fr'
  equal(locale.value, 'fr')

  b.value = undefined
  c.value = undefined
  equal(locale.value, 'ru')

  unbind()
  await delay(10)
})
