/**
 * @desc    管理模块路由文件 router.js
 * @author  yijie
 * @date    2020-09-18 15:30
 * @logs[0] 2020-09-18 15:30 yijie 创建了文件router.js
 * @logs[1] 2020-09-18 16:35 yijie 修改了导入路由页面的方式
 */

const impoartPageView = view => () =>
  import(
    /* webChunkName: "admin-manage" */
    '@modules/admin/views/manage/' + view + '.vue'
  )

export default [{
  path: '/admin/manage/index',
  name: 'admin-manage-index',
  component: impoartPageView('Index'),
  meta: {
    title: '后台管理',
    need: { admin: true }
  },
  children: [{
    path: '/admin/manage/user',
    name: 'admin-manage-user',
    component: impoartPageView('User'),
    meta: {
      title: '用户管理',
      need: { admin: true }
    }
  }]
}]
