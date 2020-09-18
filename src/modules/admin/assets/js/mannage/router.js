/**
 * @desc      管理模块路由文件 router.js
 * @author    yijie
 * @date      2020-09-08 00:00
 * @logs[0]   yijie 2020-09-08 00:00 创建了文件router.js
 */

export default [{
  path: '/admin/manage/index',
  name: 'admin-manage-index',
  component: _ => import(
    /* webChunkName: "admin-manage" */
    '@modules/admin/views/manage/Index.vue'
  ),
  meta: {
    title: '后台管理',
    need: { admin: true }
  },
  children: [{
    path: '/admin/manage/user',
    name: 'admin-manage-user',
    component: _ => import(
      /* webChunkName: "admin-manage" */
      '@modules/admin/views/manage/User.vue'
    ),
    meta: {
      title: '用户管理',
      need: { admin: true }
    }
  }]
}]
