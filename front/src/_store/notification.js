export const notification = {
  namespaced: true,
  state: {
    snackbar: false,
    color: '',
    message: '',
    timeout: 5000
  },
  actions: {
    success ({ commit }, message) {
      commit('success', message)
      commit('clear')
    },
    info ({ commit }, message) {
      commit('info', message)
      commit('clear')
    },
    error ({ commit }, message) {
      commit('error', message)
      commit('clear')
    },
    clear ({ commit }, message) {
      commit('clear')
    },
    close ({ commit }) {
      commit('close')
    }
  },
  mutations: {
    success (state, message) {
      state.snackbar = true
      state.color = 'green'
      state.message = message
    },
    info (state, message) {
      state.snackbar = true
      state.color = 'blue'
      state.message = message
    },
    error (state, message) {
      state.snackbar = true
      state.color = 'red'
      state.message = message
    },
    clear (state) {
      setTimeout(() => {
        state.snackbar = false
        state.color = 'blue'
        state.message = ''
      }, state.timeout)
    },
    close (state) {
      state.snackbar = false
      state.color = 'blue'
      state.message = ''
    }
  }
}
