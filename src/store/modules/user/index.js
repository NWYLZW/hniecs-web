/**
 * @desc    user.store.index index.js
 * @author  yijie
 * @date    2020-09-17 13:07
 * @logs[0] 2020-09-17 13:07 yijie 创建了index.js文件
 * @logs[1] 2020-09-17 17:36 yijie 添加登陆与登出逻辑
 */
import userRpc from '@modules/door/assets/js/rpc.js'

export default {
  namespaced: true,
  state: {
    // 用户数据
    userData: {},
    // app列表
    topNavApps: []
  },
  mutations: {
    /**
     * 设置用户数据
     * @param state     user.state
     * @param userData  用户信息字典
     */
    setUserData (state, userData) {
      state.userData = userData
    },
    /**
     * 设置用户数据
     * @param state user.state
     * @param apps  待添加覆盖的app列表
     */
    setApps (state, apps) {
      state.topNavApps = apps
    }
  },
  actions: {
    /**
     * 刷新app列表
     * @param   commit  vuex.store.user.commit对象
     */
    refresh_apps ({ commit }) {
      return new Promise((resolve, reject) => {
        userRpc.user.getApps(
        ).then(_ => {
          commit('setApps', _.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 登陆
     * @param dispatch  vuex.store.user.dispatch对象
     * @param commit    vuex.store.user.commit对象
     * @param userName  用户名
     * @param pwd       密码
     */
    login ({ dispatch, commit }, [userName, pwd]) {
      return new Promise((resolve, reject) => {
        const isRemenberMe = (localStorage.getItem('login-isRemenberMe') === 'true')
        pwd = (_ => {
          if (isRemenberMe) {
            let user = localStorage.getItem('remenber-user-loginData')
            if (user != null) {
              user = JSON.parse(user)
              if (user.userName === userName) {
                return user.pwd
              }
            }
          }
          return require('js-sha256').sha256(pwd)
        })()
        userRpc.user.login(
          userName, pwd
        ).then(_ => {
          if (_.code !== 200) {
            reject(_); return
          }
          if (isRemenberMe) {
            localStorage.setItem('remenber-user-loginData', JSON.stringify({
              userName, pwd
            }))
          }
          commit('setUserData', _.data.user)
          sessionStorage.setItem('sessionToken', _.data.sessionToken)
          dispatch('refresh_apps')
            .then(resolve).catch(reject)
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
