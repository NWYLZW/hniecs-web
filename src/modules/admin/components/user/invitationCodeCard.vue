<!--
  @desc     邀请码卡片 invitationCodeCard.vue
  @author   yijie
  @date     2020-09-19 16:49
  @logs[0]  2020-09-19 16:49 yijie 创建了invitationCodeCard.vue文件
-->

<template>
  <div class="invitation-code-card-main">
    <span class="delete-btn" @click="deleteMe">
      <i class="hniecs-iconfont" v-html="'&#xe613;'"/>
    </span>
    <div class="code-content pointer" @click="changeAvailableInviteContent">{{ data.invitationCode }}</div>
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
      <el-tag
        class="pointer"
        @click="changeAvailableInviteTagName"
        type="success">{{ data.tagName }}</el-tag>

      <el-tooltip effect="dark"
                  :content="'可使用次数' + data.availableInviteCount" placement="top">
        <div class="pointer" @click="changeAvailableInviteCount" style="float: right;">
          <i class="status-icon hniecs-iconfont" v-html="'&#xe61a;'"/>{{ data.availableInviteCount }}
        </div>
      </el-tooltip>
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
    // 邀请码数据结构
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    /**
     * 删除本条邀请码
     */
    deleteMe () {
      this.$confirm('是否确认删除该条邀请码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        this.$message({
          type: 'success',
          message: '该邀请码已被删除'
        })
        this.$emit('updated', [this.data, 'id', -1])
      }).catch(_ => {})
    },
    /**
     * 修改邀请码的内容
     */
    changeAvailableInviteContent () {
      this.$prompt('重置邀请码', '', {
        confirmButtonText: '确认修改',
        cancelButtonText: '取消',
        inputPattern: /^\S*$/,
        inputErrorMessage: '不可输入空白字符'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '新邀请码是' + value
        })
        this.$emit('updated', [this.data, 'content', value])
      }).catch(_ => {})
    },
    /**
     * 修改邀请码的标签名
     */
    changeAvailableInviteTagName () {
      this.$prompt('重置邀请码标签名', '', {
        confirmButtonText: '确认修改',
        cancelButtonText: '取消',
        inputPattern: /^\S*$/,
        inputErrorMessage: '不可输入空白字符'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '新邀请码标签名是' + value
        })
        this.$emit('updated', [this.data, 'tagName', value])
      }).catch(_ => {})
    },
    /**
     * 修改邀请码的使用次数
     */
    changeAvailableInviteCount () {
      this.$prompt('重置邀请码可邀请次数', '', {
        confirmButtonText: '确认修改',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '新邀请码次数是' + value
        })
        this.$emit('updated', [this.data, 'count', value])
      }).catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.invitation-code-card-main {
  position: relative;
  .pointer {
    cursor: pointer;
    user-select: none;
  }
  margin: {
    bottom: 20px;
  };
  padding: 10px;
  width: calc(100% - 20px);

  border-radius: 8px;
  box-shadow: 0 0 10px #dddddd;
  .delete-btn {
    @extend .pointer;
    position: absolute;
    top: -5px;
    left: calc(100% - 10px);

    opacity: 0;
    color: lightcoral;
    transition: .2s;
  }
  &:hover .delete-btn {
    opacity: 1;
  }
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
