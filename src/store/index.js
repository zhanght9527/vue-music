import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
