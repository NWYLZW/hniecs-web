/**
 * @desc      错误模块入口应用的路由文件 router.js
 * @author    yijie
 * @date      2020-09-08
 * @logs[0]   yijie 2020-09-08 创建了文件router.js
 */

export default [{
  path: '/error/index/index',
  name: 'error-index-index',
  component: _ => import(
    /* webChunkName: "error-index" */
    '@modules/error/views/index/Index.vue'
  ),
  meta: {
    title: '湖南工程学院计算机协会'
  },
  children: [{
    path: '/error/index/pageNotFound',
    name: 'error-index-pageNotFound',
    component: _ => import(
      /* webChunkName: "error-index" */
      '@modules/error/views/index/PageNotFound.vue'
    ),
    meta: {
      title: '你访问的页面找不到啦'
    }
  }]
}]
