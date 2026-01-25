import { signal } from '@preact/signals-core'

export function localeFrom(...stores) {
  let unbinds = Array(stores.length)

  let store = signal(undefined, {
    watched: listener,
    unwatched: () => {
      for (let unbind of unbinds) unbind()
      unbinds = Array(stores.length)
    }
  })

  function listener() {
    let i
    for (i = 0; i < stores.length; i++) {
      let locale = stores[i].peek()
      if (!unbinds[i]) {
        let init = false
        unbinds[i] = stores[i].subscribe(() => {
          if (!init) return init = true;
          listener()
        })
      }
      if (locale) {
        store.value = locale
        for (let j = i + 1; j < stores.length; j++) {
          if (!unbinds[j]) break
          unbinds[j]()
          unbinds[j] = undefined
        }
        return
      }
    }
  }

  return store
}
