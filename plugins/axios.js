export default function ({ $axios, $cookies, store }) {
  if (process.client) {
    
    if (!store.getters['auth/isLoggedIn']) {
      store.commit('auth/LOGIN', $cookies.get('user'))
    }
    if (store.state.auth.user) {
      $axios.setToken(store.state.auth.user.token, 'Bearer')
    }
  }
}