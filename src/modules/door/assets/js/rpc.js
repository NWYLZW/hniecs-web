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
     */
    login (userName, password) {
      return axios.post('/spring-api/user/base/login', {
        userName, password
      })
    },
    /**
     * 用户登出
     */
    logout () {
      return axios.get('/spring-api/user/base/logout')
    },
    /**
     * 用户注册
     * @param userName          Y   ""  用户名
     * @param password          Y   ""  密码
     * @param realName          Y   ""  用户名
     * @param schoolNum         Y   ""  用户名
     * @param profession        Y   ""  用户名
     * @param classNum          Y   ""  用户名
     * @param qqNum             Y   ""  用户名
     * @param telNum            Y   ""  用户名
     * @param invitationCode    Y   ""  邀请码
     */
    registered ({ userName, password, realName, schoolNum, profession, classNum, qqNum, telNum, invitationCode }) {
      return axios.post('/spring-api/user/base/registered', {
        userName, password, realName, schoolNum, profession, classNum, qqNum, telNum, invitationCode
      })
    },
    /**
     * 获取用户可使用的app列表
     */
    getApps () {
      return axios.get('/spring-api/user/rule/getApps')
    }
  }
}
