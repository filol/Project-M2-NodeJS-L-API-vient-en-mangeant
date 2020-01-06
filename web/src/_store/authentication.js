import { authService } from '../_services'
import { router } from '../_helpers'
import cookies from 'vue-cookies'

const user = { username: cookies.get('username') }

const initialState = user.username
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username })

      authService.login(username, password)
        .then(
          response => {
            commit('loginSuccess', { username: username })
            dispatch('notification/success', 'Successful login', { root: true })
            router.push('/')
          }
        ).catch(err => {
          commit('loginFailure', err)
          dispatch('notification/error', err, { root: true })
        })
    },
    register ({ dispatch, commit }, { username, email, password }) {
      commit('loginRequest', { username })

      authService.register(username, email, password)
        .then(
          response => {
            commit('loginSuccess', { username: username })
            dispatch('notification/success', 'Successful registration', { root: true })
            router.push('/')
          }
        ).catch(err => {
          commit('loginFailure', err)
          dispatch('notification/error', err, { root: true })
        })
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
      state.status = { loggedIn: false }
      state.user = null
    },
    logout (state) {
      state.status = { loggedIn: false }
      state.user = null
    }
  }
}
