<!--
  @desc     邀请码卡片 invitationCodeCard.vue
  @author   yijie
  @date     2020-09-19 16:49
  @logs[0]  2020-09-19 16:49 yijie 创建了invitationCodeCard.vue文件
-->

<template>
  <div class="invitation-code-card-main">
    <div class="code-content">{{ data.invitationCode }}</div>
    <div class="option">
      <el-tooltip effect="dark"
                  v-if="data.status === 0"
                  content="未使用" placement="top">
        <i class="status-icon hniecs-iconfont" v-html="'&#xe657;'" style="color: #1f9aff;"/>
      </el-tooltip>
      <el-tooltip effect="dark"
                  v-else-if="data.status === 1"
                  content="已使用" placement="top">
        <i class="status-icon hniecs-iconfont" v-html="'&#xe657;'"/>
      </el-tooltip>
      <el-tooltip effect="dark"
                  v-else-if="data.status === 2"
                  content="已禁用" placement="top">
        <i class="status-icon hniecs-iconfont" v-html="'&#xe610;'" style="color: #fe2637;"/>
      </el-tooltip>
      <el-tag type="success">{{ data.tagName }}</el-tag>

      <div style="float: right;">
        <i class="status-icon hniecs-iconfont" v-html="'&#xe657;'"/>{{ data.availableInviteCount }}
      </div>
    </div>
    <div class="message">
      <span class="author">
        <i class="hniecs-iconfont" v-html="'&#xeb9c;'"/>{{ data.creater.name }}
      </span>
      <el-tooltip class="item" effect="dark" content="上次修改时间" placement="top">
        <span class="modify-time" style="float: right;margin-left: 10px;">
          <i class="hniecs-iconfont" v-html="'&#xe626;'"/>{{ new Date(data.mtime).format('yyyy-MM-dd') }}
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="创建时间" placement="top">
        <span class="modify-time" style="float: right;">
          <i class="hniecs-iconfont" v-html="'&#xe626;'"/>{{ new Date(data.ctime).format('yyyy-MM-dd') }}
        </span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'invitationCodeCard',
  props: {
    data: {
      type: Object,
      default () {
        return {
          // 邀请码内容
          invitationCode: 'bxcsuiyfgs126GYUIhoh7984123njib5849659HUIHUIfyutasd34789274sbajhg',
          // 状态 0 未使用，1 已使用，2 禁用
          status: 2,
          // 标签名
          tagName: 'wechat',
          // 剩余邀请次数
          availableInviteCount: '789',
          // 创建用户
          creater: {
            name: 'YiJie'
          },
          ctime: '2020-09-12T05:00:00.000+00:00',
          mtime: '2020-09-11T05:00:00.000+00:00'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.invitation-code-card-main {
  margin: {
    bottom: 20px;
  };
  padding: 10px;
  width: calc(100% - 20px);

  border-radius: 8px;
  box-shadow: 0 0 10px #dddddd;
  .code-content {
    padding: {
      left: 10px; right: 10px;
    };
    margin: {
      top: 10px;
      bottom: 10px;
    };
    width: calc(100% - 20px); height: 30px;
    line-height: 30px;
    font: {
      weight: bold;
      size: 18px;
    };
    color: map-get($use-colors, font-color);
    background-color: map-get($use-colors, background);
    border-radius: 4px;

    overflow: hidden;
    text-overflow: ellipsis;
  }
  .option {
    height: 36px;
    line-height: 36px;

    .status-icon {
      margin-right: 10px;
    }
  }
  .message {
    padding: {
      top: 5px; bottom: 5px;
    };
    font: {
      size: 12px;
    };
  }
}
</style>
