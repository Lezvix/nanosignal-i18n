import { signal } from '@preact/signals-core'
import { equal } from 'node:assert'
import { test } from 'node:test'

import { createI18n, createProcessor } from '../index.js'

let locale = signal('en')

test('uses size processor', () => {
  let screenSize = signal('big')
  let size = createProcessor(screenSize)

  let i18n = createI18n(locale, {
    get() {
      return Promise.resolve({})
    },
    processors: [size]
  })

  let messages = i18n('templates', {
    title: size({
      big: 'big screen',
      small: 'small screen'
    })
  })
  equal(messages.value.title(), 'big screen')
  screenSize.value = 'small'
  equal(messages.value.title(), 'small screen')
})
