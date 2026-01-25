import { signal } from '@preact/signals-core'

import { createI18n, createProcessor } from '../index.js'

let locale = signal('en')
let sizeStore = signal<'big' | 'small'>('big')
let size = createProcessor(sizeStore)

let i18n = createI18n(locale, {
  get() {
    return Promise.resolve({})
  },
  processors: [size]
})

let t = i18n('component', {
  title: size({
    big: 'Very very long text',
    small: 'Short'
  })
})

console.log(t.value.title)
