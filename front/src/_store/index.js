import Vue from 'vue'
import Vuex from 'vuex'

import { authentication } from './authentication'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { authentication }
})
