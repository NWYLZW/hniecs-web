/**
 * @desc      门户模块用户应用的路由文件 router.js
 * @author    yijie
 * @date      2020-09-11
 * @logs[0]   yijie 2020-09-11 创建了文件router.js
 */
import { importView } from '@modules/door/assets/js/router'

export default [{
  path: '/door/user/login',
  name: 'login',
  component: importView.user('Login'),
  meta: {
    title: '登陆'
  }
}, {
  path: '/door/user/registered',
  name: 'registered',
  component: importView.user('Registered'),
  meta: {
    title: '注册',
    need: {
      login: false
    }
  }
}]
