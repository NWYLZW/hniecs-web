<!--
    @desc     主页面 Home页面
    @author   fengzili
    @date     2020-09-07
    @logs[0]  fengzili 2020-09-07 创建了文件Home.vue
    @logs[1]  fengzili 2020-09-08 添加打卡组件，修复样式错误
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
        <div class="panel-label">
          <el-badge :value="1" class="item">
            <i class="hniecs-iconfont">&#xe7a3;</i>热门文章
          </el-badge>
        </div>
        <div class="content">
          <div class="article"
            :key="index"
            v-for="(article, index) in articles">
            <el-tooltip v-if="article.showTooltip" placement="top">
              <div slot="content">{{article.title}}</div>
              <div class="title">
                <i class="hniecs-iconfont">&#xe61e;</i>{{ article.showTitle() }}
              </div>
            </el-tooltip>
            <div v-else class="title">
              <i class="hniecs-iconfont">&#xe61e;</i>{{ article.showTitle() }}
            </div>
            <div class="messages">
              <div class="author">
                <i class="hniecs-iconfont">&#xeb9c;</i>{{ article.author }}
              </div>
              <div class="date">
                <i class="hniecs-iconfont">&#xe626;</i>{{ new Date(article.dateTime).format('yy-MM-dd') }}
              </div>
              <div style="clear: both"></div>
            </div>
            <div class="content">{{ article.content }}</div>
          </div>
        </div>
      </el-card>
      <el-card class="mark panel">
        <div class="panel-label">
          <i class="hniecs-iconfont">&#xeb90;</i>活跃记录
        </div>
        <markData class="content"></markData>
      </el-card>
      <el-card class="messages panel">
        <div class="panel-label">
          <el-badge :value="2" class="item" type="primary">
            <i class="hniecs-iconfont">&#xe6a9;</i>站内信息
          </el-badge>
        </div>
        <div class="content">
          <el-alert
            class="message"
            title="注册成功"
            description="欢迎加入HNIECS大家庭"
            type="success" show-icon
            :closable="false"/>
          <el-alert
            class="message"
            title="个人信息改动"
            description="修改了登录密码"
            type="warning" show-icon
            :closable="false"/>
        </div>
      </el-card>
      <div style="clear: both"></div>
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
