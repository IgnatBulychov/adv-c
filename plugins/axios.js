export default function ({ $axios, $cookies, store }) {
  $axios.onRequest(config => {
    if (config.url.includes('dadata.ru')) {
      return
    }
    if (store.getters['auth/isLoggedIn']) {
      $axios.setToken(store.state.auth.user.token, 'Bearer')
    }
  })
}