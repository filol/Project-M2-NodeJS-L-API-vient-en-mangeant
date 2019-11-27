import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

// set default config
VueCookies.config('7d')

// set global cookie
VueCookies.set('Authorization', '')
