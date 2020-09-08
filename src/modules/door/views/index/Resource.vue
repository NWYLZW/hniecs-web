<!--
  @desc     资源页面 Resource页面
  @author   yijie
  @date     2020-09-07
  @logs[0]  yijie 2020-09-07 创建了文件Resource.vue
-->
<template>
  <div class="Resource-main">
    <el-carousel height="350px" direction="vertical" :autoplay="false">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-tabs
      class="tabs"
      @tab-click="tabChange"
      v-model="activeName">
      <el-tab-pane
        label="全部" name="all"
        class="pane">
        <el-card class="resource" shadow="hover"
          :key="index"
          v-for="(resource, index) in resources">
          <el-image fit="scale-down"
            :src="resource.previewUrl"/>
          <div class="mask-options">
            <el-button :icon="'el-icon-star' + (resource.is.star?'-on':'-off')" circle/>
            <el-button icon="el-icon-info" circle/>
            <el-button icon="el-icon-share" circle/>
          </div>
          <div class="title">{{ resource.title }}</div>
          <div class="tags">
            <el-tag class="tag"
                    :key="index"
                    v-for="(tag, index) in resource.tags"
                    :type="tag.type">
              <span class="hniecs-iconfont" v-html="tag.iconUTF8"/>{{ tag.name }}
            </el-tag>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane
        label="工具" name="setting"
        class="pane">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="../../assets/js/index/resource.js"></script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  margin: 0;

  text-align: center;
  color: #475669;
  line-height: 350px;

  &:nth-child(2n) {
    background-color: #99a9bf;
  }

  &:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}

.Resource-main{
  padding: {
    top: 30px; bottom: 60px;
  };
  .tabs {
    padding: {
      left: 100px; right: 100px;
    };

    /deep/ .el-tabs__active-bar {
      height: 2px;
      border-radius: 1px;
    }
    /deep/ .el-tabs__nav-wrap::after {
      background-color: rgba(0, 0, 0, 0);
    }
    .pane {
      .resource {
        position: relative;float: left;
        margin: 10px;
        width: 250px; height: 381px;

        /deep/ .el-card__body {
          padding: 0px;
          .el-image {
            margin: 20px;
            width: 210px; height: 260px;
            border-bottom: 1px solid gray;
            transition: .2s;

            &:hover + .mask-options {
              top: 24px;
            }
          }
          .mask-options {
            position: absolute;
            top: -100%; left: 24px;
            transition: .2s;
          }
          .mask-options:hover {
            top: 24px;
          }

          .title {
            @extend .a-link;
            padding-left: 10px;
            color: #7f7f7f;
            font-weight: bold;
          }
          .tags {
            .tag {
              margin: 5px;
            }
          }
          &:hover .el-image {
            margin: 0px;
            width: 250px; height: 300px;
          }
        }
      }
    }
  }
}

</style>
