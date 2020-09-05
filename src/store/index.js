import Vue from 'vue'
import Vuex from 'vuex'

if (process.env.NODE_ENV === '') {
} else if (process.env.NODE_ENV === 'production') {
} else if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex)
} else {
}

export default new Vuex.Store({
  state: require('./state.js').default,
  mutations: require('./mutations.js').default,
  actions: require('./actions.js').default,
  modules: require('./modules').default
})
