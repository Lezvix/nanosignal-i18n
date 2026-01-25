import { signal } from '@preact/signals-core'
import { equal } from 'node:assert'
import { test } from 'node:test'

import { createI18n, params } from '../index.js'

let locale = signal('en')
let i18n = createI18n(locale, {
  get() {
    return Promise.resolve({})
  }
})

test('replaces templates', () => {
  let messages = i18n('templates', {
    doubleEscaped1: params<{ '{param}': 1 }>('{{param}}'),
    doubleEscaped2: params<{ param: 1 }>('{{param}}'),
    multiple: params('{one} {one} {two}'),
    noParams: params('no params')
  })
  equal(messages.value.multiple({ one: 1, two: 2 }), '1 1 2')
  equal(messages.value.noParams(), 'no params')
  equal(messages.value.doubleEscaped1({ '{param}': 1 }), '1')
  equal(messages.value.doubleEscaped2({ param: 1 }), '{1}')
})
