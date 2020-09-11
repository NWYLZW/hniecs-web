/**
 * @desc      门户模块用户应用的路由文件 router.js
 * @author    yijie
 * @date      2020-09-11
 * @logs[0]   yijie 2020-09-11 创建了文件router.js
 */

export default [{
  path: '/door/user/login',
  name: 'door-user-login',
  component: _ => import(
    /* webChunkName: "door-user" */
    '@modules/door/views/user/Login.vue'
  ),
  meta: {
    title: '登陆'
  }
}]
