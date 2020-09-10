<!--
  @desc     主页面 Home页面
  @author   yijie
  @date     2020-09-07
  @logs[0]  yijie 2020-09-07 创建了文件Home.vue
  @logs[1]  yijie 2020-09-08 添加打卡组件，修复样式错误
  @logs[2]  yijie 2020-09-08 添加友情链接
  @logs[3]  yijie 2020-09-10 抽离carouselItem
-->
<template>
  <div class="main">
    <el-carousel
      class="top-carousel"
      :interval="5000" type="card" height="360px">
      <el-carousel-item
        :key="index"
        v-for="(carousel, index) in carousels">
        <carouselItem :carousel="carousel"/>
      </el-carousel-item>
    </el-carousel>
    <div class="panels">
      <el-card class="panel services">
        <div class="panel-label">
          <svg class="hniecs-iconsymbol" aria-hidden="true">
            <use xlink:href="#hniecs-server2"/>
          </svg> 服务
          <div class="options">
            <i class="hniecs-iconfont is-show-content"
               @click="showServices = !showServices"
               :class="showServices?'left':'down'">&#xe665;
            </i>
          </div>
        </div>
        <div class="content flex-box"
             :class="!showServices?'dontShowContent':''">
          <web-card
            :key="index"
            v-for="(web, index) in services"
            :web="web"/>
        </div>
      </el-card>
      <el-card class="panel webs">
        <div class="panel-label">
          <i class="hniecs-iconfont">&#xe636;</i> 友情链接
          <div class="options">
            <i class="hniecs-iconfont is-show-content"
               @click="showWebs = !showWebs"
               :class="showWebs?'left':'down'">&#xe665;
            </i>
          </div>
        </div>
        <div class="content flex-box"
             :class="!showWebs?'dontShowContent':''">
          <web-card
            :key="index"
            v-for="(web, index) in webs"
            :web="web"/>
        </div>
      </el-card>
      <div style="clear: both"></div>
    </div>
    <div class="panels">
      <el-card class="panel articles">
        <div class="panel-label">
          <el-badge :value="1">
            <i class="hniecs-iconfont">&#xe7a3;</i> 热门文章
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
      <el-card class="panel mark">
        <div class="panel-label">
          <i class="hniecs-iconfont">&#xeb90;</i> 活跃记录
        </div>
        <markData class="content"></markData>
      </el-card>
      <el-card class="panel messages">
        <div class="panel-label">
          <el-badge :value="2" class="item" type="primary">
            <i class="hniecs-iconfont">&#xe6a9;</i> 站内信息
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

  background-color: #e2e2e2;
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
