<!--
  @desc     door.index入口页面 Index页面
  @author   yijie
  @date     2020-09-07
  @logs[0]  yijie 2020-09-07 创建了文件Index.vue
  @logs[1]  yijie 2020-09-08 添加底部信息
-->
<template>
  <div class="main">
    <topNavigationBar
      name="HNIECE"
      :nav-items="[{
        url: '/door/index/home',
        name: '首页', iconUTF8: '&#xe7a7;'
      }, {
        url: '/door/index/resource',
        name: '资源', iconUTF8: '&#xe743;'
      }, {
        url: '/door/index/mall',
        name: '集市', iconUTF8: '&#xe74e;'
      }, {
        url: '/door/index/blog',
        name: '博客', iconUTF8: '&#xe7a3;'
      }, {
        url: '/door/index/code',
        name: 'Code', iconUTF8: '&#xe6f2;'
      }, {
        url: '/door/index/more',
        name: '更多', iconUTF8: '&#xe74f;'
      }]"/>
    <router-view/>
    <bottomProjectMessage/>
  </div>
</template>

<script>
import topNavigationBar from '@components/topNavigationBar'
import bottomProjectMessage from '@components/bottomProjectMessage'

export default {
  name: 'Index',
  components: {
    topNavigationBar,
    bottomProjectMessage
  }
}
</script>

<style lang="scss" scoped>
.main {
}
</style>
