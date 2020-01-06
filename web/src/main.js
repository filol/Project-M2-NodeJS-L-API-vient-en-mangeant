import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { router } from './_helpers'
import { store } from './_store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.config.productionTip = false
Vue.$cookies.config('7d')

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
