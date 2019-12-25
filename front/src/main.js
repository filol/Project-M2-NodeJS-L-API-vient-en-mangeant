import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { router } from './_helpers'
import { store } from './_store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
