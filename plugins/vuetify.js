import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'mdi fa',
  options: {
    customProperties: true
  },
  theme: {
    football: '#D72031',
    tennis: '#ffd100',
    padel: '#2f7de1',
    badminton: '#00afaa'
  }
})
