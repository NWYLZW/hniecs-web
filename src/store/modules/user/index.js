/**
 * @desc    user.store.index index.js.js
 * @author  yijie
 * @date    2020-09-17 13:07
 * @logs[0] 2020-09-17 13:07 yijie 创建了index.js.js文件
 * @logs[1] 2020-09-17 17:36 yijie 添加登陆与登出逻辑
 */
import userRpc from '@modules/door/assets/js/rpc.js'

export default {
  namespaced: true,
  state: {
    userData: {}
  },
  mutations: {
    /**
     * 设置用户数据
     * @param state     user.state
     * @param userData  用户信息字典
     */
    setUserData (state, userData) {
      state.userData = userData
    }
  },
  actions: {
    /**
     * 登陆
     * @param commit    vuex.store.user.commit对象
     * @param userName  用户名
     * @param pwd       密码
     */
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
    },
    /**
     * 登出
     * @param commit  vuex.store.user.commit对象
     */
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        userRpc.user.logout(
        ).then(_ => {
          if (_.code !== 200) {
            reject(_); return
          }
          commit('setUserData', {})
          sessionStorage.removeItem('sessionToken')
          resolve(_)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
