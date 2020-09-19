<!--
  @desc     邀请码管理页面 InvitationCode.vue
  @author   yijie
  @date     2020-09-19 15:15
  @logs[0]  2020-09-19 15:15 yijie 创建了InvitationCode.vue文件
-->

<template>
  <div class="main">
    <el-card class="invitation-codes-card">
      <div slot="header">
        <div class="title">
          <i class="hniecs-iconfont">&#xe647;</i> 已下发邀请码
        </div>
        <el-input class="search" v-model="searchInvitationCode" placeholder="搜索邀请码"/>
        <el-select class="tag-name-sel" v-model="tag.sel" placeholder="邀请码类型">
          <el-option
            :key="index"
            v-for="(ic, index) in tag.list"
            :label="ic.label" :value="ic.label">
          </el-option>
        </el-select>
      </div>
      <div class="wrraper" v-infinite-scroll="loadMoreInvitationCode">
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
        <invitationCodeCard/>
      </div>
    </el-card>
    <el-card class="invitation-operate-card">
      <div slot="header" class="clearfix">
        <div class="title">
          <i class="hniecs-iconfont">&#xe76e;</i> 邀请码管理
        </div>
      </div>
      <el-input
        class="invitation-codes"
        v-model="invitationCodes"
        :rows="4"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="输入邀请码(多个邀请码使用,分隔)" type="textarea"/>
    </el-card>
  </div>
</template>

<script>
import invitationCodeCard from '@modules/admin/components/user/invitationCodeCard'
export default {
  name: 'InvitationCode',
  components: {
    invitationCodeCard
  },
  data () {
    return {
      searchInvitationCode: '',
      invitationCodes: '',
      tag: {
        sel: '全部',
        list: [{
          label: '全部'
        }, {
          label: 'ali'
        }, {
          label: 'wechat'
        }, {
          label: '其他'
        }]
      }
    }
  },
  methods: {
    loadMoreInvitationCode () {
      console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  .invitation-codes-card {
    float: left;
    margin-right: 20px;
    width: 600px;height: 800px;

    .title {
      float: left;
      margin-right: 20px;
      line-height: 40px;
    }
    .search {
      width: 200px;
      margin-right: 20px;
    }
    .tag-name-sel {
      width: 120px;
    }

    /deep/ .el-card__body{
      height: calc(100% - 118px);
      overflow: auto;
      .wrraper {
      }
    }
  }
  .invitation-operate-card {
    float: left;
    width: 650px;height: 400px;

    .invitation-codes {
      width: 450px;
    }
  }
}
</style>
