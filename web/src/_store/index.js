import Vue from 'vue'
import Vuex from 'vuex'

import { authentication } from './authentication'
import { notification } from './notification'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { authentication, notification }
})
