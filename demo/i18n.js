import { browser, createI18n, formatter, localeFrom } from '../index.js'
import { effect, signal } from '@preact/signals-core'

export let localeSetting = signal(undefined);

export let locale = localeFrom(
  localeSetting,
  browser({ available: ['en', 'ru'] })
)

export let i18n = createI18n(locale, {
  async get(code) {
    if (code === 'ru') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            page: {
              desc: 'Сегодня {date}, a {relativeDate} станет лучше',
              title: 'Демо интернационализации'
            }
          })
        }, 1000)
      })
    }
  }
})

export let format = formatter(locale)
