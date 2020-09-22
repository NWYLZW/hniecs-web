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
      <div class="wrraper"
           v-infinite-scroll="loadMoreInvitationCode">
          <invitationCodeCard
            @updated="invitationCodeUpdate"
            :key="index" :data="invitationCode"
            v-for="(invitationCode, index) in invitationCodes"/>
          <div
            v-if="is.loadMoreInvitationCode"
            v-loading="true"
            class="infinite-scroll-loading"/>
        </div>
    </el-card>
    <el-card class="invitation-operate-card">
      <div slot="header" class="clearfix">
        <div class="title">
          <svg class="hniecs-iconsymbol" style="font-size: 20px;" aria-hidden="true">
            <use xlink:href="#hniecs-invitationCode"/>
          </svg> 邀请码管理
        </div>
      </div>
      <el-input
        v-if="submitModel === 'text'"
        v-model="invitationCodesStr"
        class="invitation-codes left"
        :rows="16" resize="none"
        placeholder="输入邀请码(多个邀请码使用,分隔)" type="textarea"/>
      <el-upload
        v-else
        class="upload-card"
        name="excelFile"
        action="https://jsonplaceholder.typicode.com/posts/"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :limit="1"
        :auto-upload="false"
        drag :multiple="false"
        :on-exceed="_ => {
              $message({
              'type': 'warning',
              'message': '最多上传一个文件'
            })
          }">
        <i class="el-icon-upload"/>
        <div class="el-upload__text">
          将支付宝或微信导出的xlsx文件拖到此处
          <br>或<em v-html="'点击上传'"/>
        </div>
      </el-upload>
      <div class="right-option">
        <el-tooltip
          v-if="submitModel === 'file'"
          effect="dark" placement="top"
          content="资金阈值, 等于该阈值才会被记录进数据库">
          <el-input-number
            style="margin-bottom: 10px;"
            v-model="thresholdMoney"
            :min="0" :max="100"/>
        </el-tooltip>
        <el-tooltip effect="dark" content="邀请次数" placement="top">
          <el-input-number
            v-model="availableCount"
            :min="0" :max="100"/>
        </el-tooltip>

        <el-input
          v-model="tagName" v-if="submitModel === 'text'"
          class="tagNameInput" placeholder="设置邀请码标签"/>
        <el-select
          v-model="tagName" v-else
          class="tagNameInput" placeholder="请选择上传文件类型">
          <el-option label="支付宝" value="支付宝"/>
          <el-option label="微信" value="微信"/>
        </el-select>
        <div class="btns">
          <el-tooltip effect="dark" placement="bottom" :content="submitModel==='text'?'文件模式':'文本模式'">
            <el-button
              :icon=" 'hniecs-iconfont ' + (submitModel==='text'?'hniecs-article':'hniecs-writing')"
              @click="changeSumbitModel"
              type="info" circle/>
          </el-tooltip>
          <el-tooltip effect="dark" placement="bottom" content="提交">
            <el-button
              icon="el-icon-check"
              type="success" circle/>
          </el-tooltip>
          <el-tooltip effect="dark" placement="bottom" content="清空">
            <el-button
              icon="el-icon-delete"
              @click="_ => {
                $confirm('是否确认清空文本内容?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(_ => {
                  invitationCodesStr = ''
                }).catch(_ => {})
              }"
              type="danger" circle/>
          </el-tooltip>
        </div>
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
      // 界面控制
      is: {
        // 是否在滚动加载邀请码列表数据
        loadMoreInvitationCode: false
      },
      // 锁死邀请码列表加载
      lockLoadInvitationCode: false,
      // 搜索邀请码框 内容
      searchInvitationCode: '',

      // 展示邀请码列表
      invitationCodes: [{
        invitationCode: 'bxcsuiyfgs126GYUIhoh7984123njib5849659HUIHUIfyutasd34789274sbajhg',
        status: 0,
        tagName: '微信',
        availableInviteCount: 489,
        creater: {
          name: 'YiJie'
        },
        ctime: '2020-09-12T05:00:00.000+00:00',
        mtime: '2020-09-11T05:00:00.000+00:00'
      }],

      // 邀请码阈值
      thresholdMoney: 30,
      // 提交模式 text 文本模式、file 文件模式‘
      submitModel: 'text',
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
      invitationCodesStr: '',
      // 待添加的邀请码 邀请次数
      availableCount: 1,
      // 待添加的邀请码 标签名
      tagName: ''
    }
  },
  methods: {
    /**
     * 邀请码状态更改
     * @param invitationCode  邀请码对象字典
     * @param changeProperty  被修改的属性
     * @param value           要被修改的值
     */
    invitationCodeUpdate ([invitationCode, changeProperty, value]) {
      if (!invitationCode) return
      const index = this.invitationCodes.indexOf(invitationCode)
      if (index === -1) return

      switch (changeProperty) {
        case 'id':
          if (value === -1) {
            this.invitationCodes.splice(index, 1)
          }
          break
        case 'content':
          this.invitationCodes[index].invitationCode = value
          break
        case 'tagName':
          this.invitationCodes[index].tagName = value
          break
        case 'count':
          this.invitationCodes[index].availableInviteCount = value
          break
        default: break
      }
    },
    /**
     * 加载更多的邀请码
     */
    loadMoreInvitationCode () {
      // 如果正在加载，或者被禁止加载了 直接返回
      const ableLoad = (
        this.is.loadMoreInvitationCode ||
        this.lockLoadInvitationCode)
      if (ableLoad) return

      this.is.loadMoreInvitationCode = true
      setTimeout(_ => {
        this.invitationCodes.push({
          invitationCode: 'bxcsuiyfgs126GYUIhoh7984123njib5849659HUIHUIfyutasd34789274sbajhg',
          status: 0,
          tagName: '微信',
          availableInviteCount: 489,
          creater: {
            name: 'YiJie'
          },
          ctime: '2020-09-12T05:00:00.000+00:00',
          mtime: '2020-09-11T05:00:00.000+00:00'
        })
        if (this.invitationCodes.length >= 3) {
          this.lockLoadInvitationCode = true
        }
        this.is.loadMoreInvitationCode = false
      }, 500)
    },
    /**
     * 切换邀请码的提交模式
     */
    changeSumbitModel () {
      if (this.submitModel === 'text') {
        this.submitModel = 'file'
      } else {
        this.submitModel = 'text'
      }
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

    /deep/ .el-card__body {
      height: 700px;
      overflow-x: hidden;
      .wrraper {
        .infinite-scroll-loading {
          height: 50px;
        }
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
    .upload-card {
      float: left;
      width: 400px;height: 348px;
      margin-right: 10px;
      /deep/ .el-upload {
        width: 100%; height: 100%;
        .el-upload-dragger {
          width: 100%; height: 100%;
          .el-icon-upload {
            margin-top: 130px;
          }
        }
      }
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
    }
  }
}
</style>
