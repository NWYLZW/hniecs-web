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
        <i @click="changeStatus(2)" class="status-icon hniecs-iconfont" v-html="'&#xe657;'" style="color: #1f9aff;"/>
      </el-tooltip>
      <el-tooltip effect="dark"
                  v-else-if="data.status === 1"
                  content="已使用" placement="top">
        <i @click="changeStatus(2)" class="status-icon hniecs-iconfont" v-html="'&#xe657;'"/>
      </el-tooltip>
      <el-tooltip effect="dark"
                  v-else-if="data.status === 2"
                  content="已禁用" placement="top">
        <i @click="changeStatus(0)" class="status-icon hniecs-iconfont" v-html="'&#xe610;'" style="color: #fe2637;"/>
      </el-tooltip>
      <el-tag v-if="data.tagName !== null && data.tagName !== ''"
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
        <i class="hniecs-iconfont" v-html="'&#xeb9c;'"/>{{ data.creator.userName }}
      </span>
      <el-tooltip class="item" effect="dark" content="上次修改时间" placement="top">
        <span v-if="data.mtime !== null" class="modify-time" style="float: right;margin-left: 10px;">
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { InputOperatePreConfirm } from '@decorator/operatePreConfirm'
import User from '@cObj/User'
import type WithCtimeMtime from '@cObj/WithCtimeMtime'

/**
 * 邀请码对象
 */
class InvitationCode implements WithCtimeMtime {
  // 邀请码id
  id: number;
  // 标签名
  tagName: string;
  // 邀请码内容
  invitationCode: string;
  // 邀请码可使用次数
  availableInviteCount: number;

  // 邀请码状态 0,未使用 1,已使用 2,已禁用
  status: number;

  // 创建者实体
  creator: User;
}
export { InvitationCode }

export default @Component class invitationCodeCard extends Vue {
  @Prop([InvitationCode, Object])
  // 邀请码数据结构
  data: InvitationCode;

  /**
   * 删除本条邀请码
   */
  deleteMe () {
    this.$confirm('是否确认删除该条邀请码?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(_ => {
      this.$emit('updated', [this.data, 'id', -1])
    }).catch(_ => {})
  }

  /**
   * 修改邀请码使用状态
   * @param status
   */
  changeStatus (status) {
    this.$confirm('是否' + (status === 2 ? '禁用' : '启用') + '该条邀请码?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(_ => {
      this.$emit('updated', [this.data, 'status', status])
    }).catch(_ => {})
  }

  /**
   * 修改邀请码的内容
   * @param value 修改后的值
   */
  @InputOperatePreConfirm({
    title: '重置邀请码',
    inputPattern: /^\S*$/,
    inputErrorMessage: '不可输入空白字符'
  })
  changeAvailableInviteContent (value) {
    this.$emit('updated', [this.data, 'content', value])
  }

  /**
   * 修改邀请码的标签名
   * @param value 修改后的值
   */
  @InputOperatePreConfirm({
    title: '重置邀请码标签名',
    inputPattern: /^\S*$/,
    inputErrorMessage: '不可输入空白字符'
  })
  changeAvailableInviteTagName (value) {
    this.$emit('updated', [this.data, 'tagName', value])
  }

  /**
   * 修改邀请码的使用次数
   */
  @InputOperatePreConfirm({
    title: '重置邀请码可邀请次数',
    inputPattern: /^[1-9]\d*$/,
    inputErrorMessage: '请输入数字'
  })
  changeAvailableInviteCount (value) {
    this.$emit('updated', [this.data, 'count', value])
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
      @extend .pointer;
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
