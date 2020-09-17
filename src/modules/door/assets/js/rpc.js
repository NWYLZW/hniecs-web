/**
 * @desc      门户模块接口层文件 rpc.js
 * @author    yijie
 * @date      2020-09-07
 * @logs[0]   yijie 2020-09-07 创建了rpc.js文件
 */
import axios from '@plugins/axios'
// mock拦截ajax请求 伪造假数据
// import '@mock'

export default {
  user: {
    /**
     * 用户登录
     * @param userName  用户名
     * @param password  密码
     * @returns {*}
     */
    login (userName, password) {
      return axios.post('/spring-api/user/base/login', {
        userName, password
      })
    },
    /**
     * 用户登出
     * @returns {*}
     */
    logout () {
      return axios.get('/spring-api/user/base/logout')
    },
    /**
     * 获取用户可使用的app列表
     * @returns {*}
     */
    getApps () {
      return axios.get('/spring-api/user/Role/getApps')
    }
  }
}
