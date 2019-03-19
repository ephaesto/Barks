import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
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