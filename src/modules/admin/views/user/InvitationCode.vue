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
        class="invitation-codes left"
        v-model="invitationCodes"
        :rows="14" resize="none"
        placeholder="输入邀请码(多个邀请码使用,分隔)" type="textarea"/>
      <div class="right-option">
        <el-tooltip effect="dark" content="邀请次数" placement="top">
          <el-input-number
            v-model="availableCount"
            :min="0" :max="100"/>
        </el-tooltip>
        <el-tooltip effect="dark" content="标签名" placement="top">
          <el-input class="tagNameInput" v-model="tagName"/>
        </el-tooltip>
        <div class="btns">
          <el-tooltip effect="dark" content="提交" placement="top">
            <el-button type="success" icon="el-icon-check" circle/>
          </el-tooltip>
          <el-tooltip effect="dark" content="清空" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle/>
          </el-tooltip>
        </div>
        <el-upload
          class="upload-card"
          action="https://jsonplaceholder.typicode.com/posts/"
          drag multiple>
          <i class="el-icon-upload"/>
          <div class="el-upload__text">
            将支付宝或微信导出的xlsx文件拖到此处
            <br>或<em v-html="'点击上传'"/>
          </div>
        </el-upload>
      </div>
      <div style="clear: both;"></div>
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
      // 搜索邀请码框 内容
      searchInvitationCode: '',
      // 标签结构 sel当前选择标签分类 list标签列表
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
      },
      // 待添加的邀请码
      invitationCodes: '',
      // 待添加的邀请码 邀请次数
      availableCount: 1,
      // 待添加的邀请码 标签名
      tagName: ''
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
    width: 750px;

    .invitation-codes.left {
      float: left;
      margin-right: 10px;
      width: 400px;
    }
    .right-option {
      float: left;
      width: calc(100% - 410px);

      .tagNameInput {
        margin-top: 10px;
      }
      .btns {
        width: 100%;
        margin-top: 10px;
      }
      .upload-card {
        width: 100%; height: 155px;
        margin-top: 10px;
        /deep/ .el-upload {
          width: 100%; height: 100%;
        }
        /deep/ .el-upload-dragger {
          width: 100%; height: 100%;
        }
      }
    }
  }
}
</style>
