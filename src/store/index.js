/**
 * @desc    store index.js
 * @author  yijie
 * @date    2020-09-09 00:00
 * @logs[0] 2020-09-09 00:00 yijie 创建了index.js文件
 * @logs[1] 2020-09-18 13:06 yijie 添加 vuex-persistedstate 持久化数据
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
  modules: require('./modules').default,

  plugins: [createPersistedState()]
})
