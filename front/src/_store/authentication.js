import { authService } from '../_services'
import { router } from '../_helpers'

// const user = JSON.parse(localStorage.getItem('user'))
// const initialState = user
//   ? { status: { loggedIn: true }, user}
//   : { status: {}, user: null }

const initialState = { status: {}, user: null }

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username })

      authService.login(username, password)
        .then(
          user => {
            if (user === false) commit('loginFailure')
            else {
              commit('loginSuccess', user)
              router.push('/')
            }
          },
          error => {
            commit('loginFailure', error)
            // dispatch('alert/error', error, { root: true })
          }
        )
    },
    register ({ dispatch, commit }, { username, email, password }) {
      commit('loginRequest', { username })

      authService.register(username, email, password)
        .then(
          user => {
            if (user === false) commit('loginFailure')
            else {
              commit('loginSuccess', user)
              router.push('/')
            }
          },
          error => {
            commit('loginFailure', error)
            // dispatch('alert/error', error, { root: true })
          }
        )
    },
    logout ({ commit }) {
      authService.logout()
      commit('logout')
    }
  },
  mutations: {
    loginRequest (state, user) {
      state.status = { loggingIn: true }
      state.user = user
    },
    loginSuccess (state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure (state) {
      state.status = {}
      state.user = null
    },
    logout (state) {
      state.status = {}
      state.user = null
    }
  }
}
