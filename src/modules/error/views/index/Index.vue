<!--
  @desc     error.index入口页面 Index页面
  @author   yijie
  @date     2020-09-08
  @logs[0]  yijie 2020-09-08 创建了文件Index.vue
-->
<template>
  <div class="main">
    <topNavigationBar
      name="HNIECE"
      :nav-items="[]"/>
    <router-view/>
    <bottomProjectMessage/>
  </div>
</template>

<script>
import topNavigationBar from '@/components/topNavigationBar'
import bottomProjectMessage from '@/components/bottomProjectMessage'

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
