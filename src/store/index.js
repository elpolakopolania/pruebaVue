import Vue from 'vue'
import Vuex from 'vuex'

import inscriptionStore from './inscriptionStore/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    inscriptionStore: inscriptionStore
  }
})

