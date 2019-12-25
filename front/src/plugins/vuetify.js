import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Touch } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  directives: {
    Touch
  }
})

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true
  },
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280
    },
    scrollBarWidth: 24
  }
})
