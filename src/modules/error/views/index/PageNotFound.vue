<!--
  @desc     404页面 PageNotFound页面
  @author   yijie
  @date     2020-09-08
  @logs[0]  yijie 2020-09-08 创建了文件PageNotFound.vue
-->
<template>
  <div class="PageNotFound">
    <div class="response-code">404</div>
    <div class="response-message">你访问的页面正在火热建设中</div>
    <div v-loading="true" class="loading-board"></div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  mounted () {
    setTimeout(_ => {
      this.$router.push('/')
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
.PageNotFound{
  padding: 20px;
  .response-code {
    margin: {
      top: 40px; bottom: 40px;
    };
    width: 100%;
    text: {
      align: center;
      shadow: 0 0 10px gray;
    };
    font: {
      size: 100px;
      weight: bold;
    };
  }
  .response-message {
    width: 100%;
    text: {
      align: center;
      shadow: 0 0 10px gray;
    };
    font: {
      size: 20px;
    };
  }
  .loading-board {
    position: relative;
    left: calc(50% - 100px);
    width: 200px; height: 200px;
  }
}
</style>
