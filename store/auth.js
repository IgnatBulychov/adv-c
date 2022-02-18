export const state = () => ({
  user: null
})

export const getters = {
  user(state) {
    return state.user
  },
  accessToken(state) {
    return state.user ? state.user.token : null
  },
  isLoggedIn(state) {
    return !!state.user
  }
}

export const mutations = {
  LOGIN(state, payload) {
    this.$cookies.set('user', payload)
    state.user = payload
    state.isLoggedIn = true
  },
  logout(state) {
    this.$cookies.remove('user')
    state.user = null
    state.isLoggedIn = false   
  },
}

export const actions = {
  async register({ commit }, form) {
    try {
      let response = await this.$axios.$post('/register', form)
      commit('LOGIN', response.user)
      this.$router.push('/dashboard/areas')
    } catch(e) {
      throw e
    }
  },
  async login({ commit }, form) {
    try {
      let response = await this.$axios.$post('/login', form)
      commit('LOGIN', response.user)
      this.$router.push('/dashboard/areas')
    } catch(e) {
      throw e
    }
  },
  logout(context) { 
    context.commit("logout")
    this.$router.push('/')
  }
}