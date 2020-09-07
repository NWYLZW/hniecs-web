<!--
    @desc     主页面 Home页面
    @author   fengzili
    @date     2020-09-07
    @logs[0]  fengzili 2020-09-07 创建了文件Home.vue
-->
<template>
  <div class="main">
    <el-carousel
      class="top-carousel"
      :interval="5000" type="card" height="300px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script src="../../assets/js/index/home.js"></script>

<style lang="scss" scoped>
@import "~@/modules/door/assets/style/home.scss";
/deep/ .el-carousel__item {
  transition: .3s;
  &:nth-child(2n) {
    background-color: #99a9bf;
  }
  &:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  h3 {
    position: relative;
    bottom: calc(-100% + 40px);left: 20px;
    color: #475669;
    text-align: left;
    font-size: 20px;
    margin: 0;
  }
}
</style>
