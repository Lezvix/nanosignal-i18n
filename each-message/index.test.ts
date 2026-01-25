import { signal } from '@preact/signals-core'
import { equal } from 'node:assert'
import { test } from 'node:test'
import { setTimeout } from 'node:timers/promises'

import { count, createI18n, eachMessage } from '../index.js'

test('has global transform', async () => {
  let locale = signal('en')

  let i18n = createI18n(locale, {
    get() {
      return Promise.resolve({
        games: {
          items: {
            many: '{count} игр',
            one: '{count} игра'
          },
          title: 'Игры'
        }
      })
    },
    preprocessors: [
      eachMessage(str => str.replace(/game/gi, 'GAME').replace(/игр/gi, 'ИГР'))
    ]
  })
  let messages = i18n('games', {
    items: count({
      many: '{count} games',
      one: '{count} game'
    }),
    title: 'Games'
  })

  messages.subscribe(() => {})
  equal(messages.value.title, 'GAMEs')
  equal(messages.value.items(1), '1 GAME')

  locale.value = 'ru'
  await setTimeout(10)
  equal(messages.value.title, 'ИГРы')
  equal(messages.value.items(1), '1 ИГРа')
})
