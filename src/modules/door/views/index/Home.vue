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
      :interval="5000" type="card" height="360px">
      <el-carousel-item
        :key="index"
        v-for="(carousel, index) in carousels"
        :style="'background-image: url(' + carousel.backgroundImage + ')'">
        <h3 @click="toDetailUrl(carousel)" class="title">{{ carousel.title }}</h3>
        <h5 @click="toDetailUrl(carousel)" class="message">
          {{ carousel.message }}
        </h5>
      </el-carousel-item>
    </el-carousel>
    <div class="panels">
      <el-card class="articles panel">
        <div class="panel-label"><i class="hniecs-iconfont">&#xe7a3;</i>热门文章</div>
        <div class="content">
          <div class="article">
            <div class="title">一篇测试文章</div>
            <div class="messages">
              <div class="author">yijie</div>
              <div class="date">2020-09-07</div>
              <div style="clear: both"></div>
            </div>
            <div class="content">我也不知道干啥，写在这里玩玩</div>
          </div>
        </div>
      </el-card>
      <el-card class="mark panel">
        <div class="panel-label"><i class="hniecs-iconfont">&#xeb90;</i>打卡</div>
        <markData class="content"></markData>
      </el-card>
      <el-card class="messages panel">
        <div class="panel-label"><i class="hniecs-iconfont">&#xe6a9;</i>站内信息</div>
      </el-card>
    </div>
  </div>
</template>

<script src="../../assets/js/index/home.js"></script>

<style lang="scss" scoped>
@import "~@/modules/door/assets/style/home.scss";
/deep/ .el-carousel__item {
  transition: .3s;
  border-radius: 8px;

  border: 1px solid gray;

  background-position: center;
  background-repeat: no-repeat;

  &:nth-child(2n) {
    background-color: #99a9bf;
  }
  &:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  $content-width: calc(100% - 40px);
  h3.title {
    @extend .a-link;
    position: relative;
    width: $content-width;
    bottom: calc(-100% + 40px);left: 20px;
    margin: 0;
    margin-bottom: 10px;
    color: #475669;
    text-align: left;
    transition: .2s;
  }
  h5.message {
    @extend .a-link;
    position: relative;
    width: $content-width;
    bottom: -100%;left: 20px;
    color: #b6bac4;
    text-align: left;
    margin: 0;
    transition: .2s;

    word-break:break-all;
    overflow: hidden;
    line-height:1.5em;height: 4.5em;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  &:hover h3.title {
    bottom: calc(-100% + 120px);
  }
  &:hover h5.message {
    bottom: calc(-100% + 120px);
  }
}
</style>
