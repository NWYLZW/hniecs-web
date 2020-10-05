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
     * @param userName          Y   ""  用户名     字母|中文|数字|-|_|.|@ (不能以 数字，特殊字符，中文 开头) 4-12位
     * @param password          Y   ""  密码      字母|数字|-|_|.|@ 5-20位
     * @param realName          Y   ""  真实姓名   中文 2-5位
     * @param schoolNum         Y   ""  学号      20xxxxxxxxxx 12位
     * @param profession        Y   ""  专业名    中文 20位
     * @param classNum          Y   ""  班级      数字 4位
     * @param qqNum             Y   ""  qq号码    数字 6-16位
     * @param telNum            N   ""  电话号码   数字 11位
     * @param invitationCode    Y   ""  邀请码    不含空格 50
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
