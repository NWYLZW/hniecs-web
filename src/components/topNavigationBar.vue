<!--
    @desc     头部导航条 topNavigationBar组件
    @author   fengzili
    @date     2020-09-07
    @logs[0]  fengzili 2020-09-07 创建了文件topNavigationBar.vue
    @logs[1]  fengzili 2020-09-07 完成了左侧导航条
    @logs[2]  fengzili 2020-09-07 修复要点击俩次item才会出现下划线的bug 莫名其妙的
-->
<template>
  <div class="topNavigationBar-main">
    <div class="left">
      <div class="icon">
        <img alt="" :src="leftIconSrc"/>
      </div>
      <div class="name">{{ name }}</div>
      <div class="navs">
        <div
          :key="index"
          v-for="(navItem, index) in navItems"
          @click="changeNavItem(navItem)"
          class="nav item"
          :class="{
            'sel': selItem && selItem.name === navItem.name
          }">
          <span class="icon hniecs-iconfont" v-html="navItem.iconUTF8"/>
          <span class="title">{{ navItem.name }}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <el-popover class="avatar"
        placement="bottom"
        width="300"
        title="个人中心" trigger="hover">
        <el-avatar slot="reference"
          :size="48"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        <div class="user-center-panel">
          <div class="labels">
            <div class="label">
              <div class="name">基础信息</div>
              <div class="content">
                当前免费积分 20'，当前可用积分 10'。
              </div>
            </div>
          </div>
          <div class="labels">
            <div class="label" style="max-width: 50%;">
              <div class="name">磁盘空间</div>
              <el-progress
                type="circle" :width="100"
                :percentage="1" status="success"></el-progress>
            </div>
            <div class="label" style="max-width: 50%;">
              <div class="name">磁盘信息</div>
              <div class="content">磁盘总大小 100M, 目前已使用 1M。</div>
            </div>
          </div>
          <el-tooltip placement="bottom">
            <div slot="content">个性设置</div>
            <el-button icon="el-icon-setting" circle></el-button>
          </el-tooltip>
          <div style="clear: both;"></div>
        </div>
      </el-popover>
      <div class="apps">
        <div class="app"
             :key="index"
             v-for="(app, index) in apps">
          <el-tooltip v-if="!app.menus"
            :content="app.name" placement="bottom">
            <span
              class="hniecs-iconfont"
              :style="{
                color: app.color || 'auto'
              }" v-html="app.iconUTF8"/>
          </el-tooltip>
          <el-dropdown placement="bottom" v-else>
            <span
              class="hniecs-iconfont"
              :style="{
                color: app.color || 'auto'
              }" v-html="app.iconUTF8"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :key="index"
                v-for="(menuItem, index) in app.menus">
                <span
                  style="float: left;margin-right: 10px;"
                  class="hniecs-iconfont"
                  :style="{
                    color: menuItem.color || 'auto'
                  }" v-html="menuItem.iconUTF8"/>
                <span>{{ menuItem.name }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topNavigationBar',
  components: {},
  props: {
    // 左侧图标右边的文案
    name: {
      type: String,
      default: ''
    },
    // 页面列表
    navItems: {
      type: Array,
      default: _ => {
        return []
      }
    },
    // app列表
    apps: {
      type: Array,
      default: _ => {
        // let l = {
        //   name: '后台管理',
        //   iconUTF8: '&#xe76e;'
        // }
        return [{
          name: '我的消息',
          iconUTF8: '&#xe6a2;',
          menus: [{
            name: '公告',
            iconUTF8: '&#xe6aa;'
          }, {
            name: '聊天',
            iconUTF8: '&#xe6a9;'
          }, {
            name: '看板',
            iconUTF8: '&#xe6ab;'
          }]
        }]
      }
    }
  },
  data () {
    return {
      // 导航条左侧图标
      leftIconSrc: require('@assets/image/logo.png'),
      // 当前选择的页面
      selItem: undefined
    }
  },
  computed: {},
  watch: {
    selItem () {
      if (this.$route.path !== this.selItem.url) {
        this.$router.push(this.selItem.url)
      }
    }
  },
  methods: {
    /**
     * 切换导航栏
     * @param navItem
     */
    changeNavItem (navItem) {
      this.selItem = navItem
    }
  },
  mounted () {
    this.selItem = this.navItems[0]
  }
}
</script>

<style lang="scss" scoped>
.cant-sel {
  user-select: none;
}
.pointer {
  cursor: pointer;
}

.hniecs-iconfont {
  font-size: 32px;
  color: map-get($use-colors, font-color);
}

.topNavigationBar-main {
  @extend .Regular;

  $paddings: 100px;

  position: relative;
  padding: 0 $paddings;
  width: calc(100% - 2*#{$paddings}); height: 72px;
  background-color: map-get($use-colors, background);
  border-radius: 0 0 16px 16px;
  box-shadow: 0 0 15px black;
  > .left {
    @extend .cant-sel;
    $size: 64px;
    top: calc(50% - 32px);

    position: relative;
    float: left;
    height: $size;
    line-height: $size;

    .with-margin-right {
      float: left;
      margin-right: 10px;
    }
    > .icon {
      @extend .with-margin-right;
      width: $size; height: $size;
      > img {
        @extend .pointer;
        width: 100%;height: 100%;
        image-rendering: pixelated;
      }
    }
    > .name {
      @extend .with-margin-right,.pointer;
      color: map-get($use-colors, font-color);
      font: {
        size: 24px;
        weight: 600;
      };
    }
    > .navs {
      @extend .with-margin-right;
      height: $size;

      > .nav.item {
        @extend .with-margin-right, .pointer;
        display: flex;
        justify-content: center;
        min-width: 120px; height: $size;
        text-align: center;
        border-bottom: 4px solid rgba(0, 0, 0, 0);
        color: map-get($use-colors, font-color);
        text-shadow: 0 0 0 map-get($use-colors, font-color);
        transition: .2s;

        > .icon {
          position: relative; float: left;
          font-size: $size/3;
          line-height: $size;
        }
        > .title {
          position: relative; float: left;
        }
      }
      > .nav.item.sel {
        font-size: 20px;
        border-bottom: 4px solid map-get($use-colors, border);
        text-shadow: 0 0 10px map-get($use-colors, font-color);
      }
    }
  }
  > .right {
    @extend .cant-sel;
    $size: 64px;
    top: calc(50% - 32px);

    position: relative;
    float: right;
    height: $size;
    line-height: $size;

    > .apps {
      position: relative; float: left;
      line-height: $size;
      height: $size;
      font-size: 32px;

      > .app {
        @extend .pointer;
        position: relative; float: left;

        height: 65px;
        .el-dropdown {
          height: 65px;
        }

        margin: {
          left: 10px;
          right: 10px;
        };
      }
    }
    > .avatar {
      $size: 48px;
      position: relative; float: left;
      top: calc(50% - 24px);
      width: $size; height: $size;

      /deep/ img {
        @extend .pointer;
        width: 100%;height: 100%;
      }
    }
  }
}

.user-center-panel {
  padding: 20px;
  .labels {
    position: relative;float: left;
    width: 100%;
    margin-bottom: 20px;

    > .label {
      position: relative;
      float: left;

      > .name {
        font-size: 20px;
        font-weight: 600;
      }

      > .content {
      }
    }
  }
}
</style>
