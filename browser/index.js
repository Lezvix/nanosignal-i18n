import { signal } from '@preact/signals-core'

export function browser(opts) {
  let fallback = opts.fallback || 'en'

  let store = signal(fallback, {
    watched: () => {
      if (typeof navigator !== 'undefined') {
        let languages = navigator.languages
        if (!navigator.languages) languages = [navigator.language]

        for (let language of languages) {
          if (opts.available.includes(language)) {
            store.value = language
            return
          }
        }
      }
    }
  })

  return store
}
