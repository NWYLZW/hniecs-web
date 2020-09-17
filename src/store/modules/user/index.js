/**
 * @desc    user.store.index index.js.js
 * @author  yijie
 * @date    2020-09-17 13:07
 * @logs[0] 2020-09-17 13:07 yijie 创建了index.js.js文件
 */
import userRpc from '@modules/door/assets/js/rpc.js'

export default {
  namespaced: true,
  state: {
    userData: {}
  },
  mutations: {
    setUserData (state, userData) {
      state.userData = userData
    }
  },
  actions: {
    login ({ commit }, [userName, pwd]) {
      return new Promise((resolve, reject) => {
        userRpc.user.login(
          userName, pwd
        ).then(_ => {
          if (_.code !== 200) {
            reject(_); return
          }
          commit('setUserData', _.user)
          sessionStorage.setItem('sessionToken', _.sessionToken)
          resolve(_)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
