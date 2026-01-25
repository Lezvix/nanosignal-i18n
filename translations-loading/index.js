export function translationsLoading(i18n) {
  if (i18n.loading.value) {
    return new Promise(resolve => {
      let unbindLoading = i18n.loading.subscribe(isLoading => {
        if (!isLoading) {
          unbindLoading()
          resolve()
        }
      })
    })
  } else {
    return Promise.resolve()
  }
}
