
export default async function ({app, req, store, redirect, route}) {

    if (!store.getters['auth/isLoggedIn']) {
      store.commit('auth/LOGIN', app.$cookies.get('user'))
    }

  }