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
        <el-input
          @blur="reloadInvitationCodes"
          @keyup.native.enter="reloadInvitationCodes"
          v-model="searchInvitationCode"
          class="search"
          placeholder="搜索邀请码"/>
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
        ref="uploadExcelFile"
        class="upload-card"
        name="excelFile"
        action="" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :limit="1" :auto-upload="false" :multiple="false"
        :on-exceed="_ => {
            $message({
              'type': 'warning',
              'message': '最多上传一个文件'
            })
          }" drag>
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
              @click="submitNewInvitationCodes"
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
import adminUserRpc from '@modules/admin/assets/js/user/rpc.js'
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
      // 标签结构 sel当前选择标签分类 list标签列表
      tag: {
        sel: '全部',
        list: []
      },

      // 展示邀请码列表
      invitationCodes: [],
      // 当前加载的页码
      loadPage: 1,
      // 一页加载的个数
      loadSize: 5,

      // 邀请码阈值
      thresholdMoney: 30,
      // 提交模式 text 文本模式、file 文件模式‘
      submitModel: 'text',
      // 待添加的邀请码
      invitationCodesStr: '',
      // 待添加的邀请码 邀请次数
      availableCount: 1,
      // 待添加的邀请码 标签名
      tagName: ''
    }
  },
  watch: {
    'tag.sel' () {
      this.reloadInvitationCodes()
    }
  },
  methods: {
    /**
     * 邀请码状态更改
     * @param invitationCode  邀请码对象字典
     * @param changeProperty  被修改的属性
     * @param value           要被修改的值
     */
    invitationCodeUpdate ([invitationCode: InvitationCode, changeProperty, value]) {
      if (!invitationCode) return
      const index = this.invitationCodes.indexOf(invitationCode)
      if (index === -1) return

      const mappingRelations = {
        content: 'invitationCode',
        tagName: 'tagName',
        count: 'availableInviteCount',
        status: 'status'
      }
      switch (changeProperty) {
        case 'id':
          if (value === -1) {
            adminUserRpc.deleteInvitationCode({
              id: invitationCode.id
            }).then(_ => {
              this.$message({
                type: 'success',
                message: _.message
              })
              this.reloadInvitationCodes()
            }).catch(_ => {
              this.$message({
                type: 'warning',
                message: _.message
              })
            })
          }
          break
        case 'content': case 'tagName': case 'count': case 'status':
          adminUserRpc.changeInvitationCode({
            id: invitationCode.id,
            [mappingRelations[changeProperty]]: value
          }).then(_ => {
            this.$message({
              type: 'success',
              message: _.message
            })
            this.invitationCodes[index][mappingRelations[changeProperty]] = value
          }).catch(_ => {
            this.$message({
              type: 'warning',
              message: _.message
            })
          })
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
        this.lockLoadInvitationCode
      )
      if (ableLoad) return

      this.is.loadMoreInvitationCode = true

      adminUserRpc.searchInvitationCode({
        invitationCode: this.searchInvitationCode,
        tagName: (_ => {
          if (this.tag.sel === '全部') {
            return ''
          } else {
            return this.tag.sel
          }
        })(),
        page: this.loadPage,
        size: this.loadSize
      }).then(_ => {
        this.invitationCodes = [
          ...this.invitationCodes,
          ..._.data
        ]
        this.is.loadMoreInvitationCode = false
        if (_.data.length === 0 || _.data.length < this.loadSize) {
          this.lockLoadInvitationCode = true
          return
        }

        this.loadPage += 1
      }).catch(_ => {
        this.$message({
          type: 'warning',
          message: _.message
        })
        this.lockLoadInvitationCode = true
        this.is.loadMoreInvitationCode = false
      })
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
    },
    /**
     * 获取邀请码tagName列表
     */
    refreshTagNames () {
      return new Promise((resolve, reject) => {
        adminUserRpc.getTagNames(
        ).then(_ => {
          this.tag.list = []
          for (const index in _.data) {
            this.tag.list.push({
              label: _.data[index]
            })
          }
          resolve()
        }).catch(_ => {
          this.$message({
            type: 'warning',
            message: '服务器出现了错误,请联系管理员'
          })
          reject(_)
        })
      })
    },
    /**
     * 重载邀请码列表信息
     */
    reloadInvitationCodes () {
      this.loadPage = 1
      this.invitationCodes = []
      this.lockLoadInvitationCode = false
      this.is.loadMoreInvitationCode = false
      this.refreshTagNames(
      ).then(_ => {
        this.loadMoreInvitationCode()
      }).catch(_ => {})
    },
    /**
     * 添加邀请码
     */
    submitNewInvitationCodes () {
      if (this.submitModel === 'text') {
        const invitationCodes = this.invitationCodesStr.split(',')
        if (invitationCodes.length === 0 || invitationCodes[0] === '') {
          this.$message({
            type: 'warning',
            message: '邀请码内容为空'
          })
          return
        }
        adminUserRpc.addInvitationCodes({
          invitationCodes: invitationCodes,
          tagName: this.tagName,
          availableCount: this.availableCount
        }).then(_ => {
          this.$message({
            type: 'success',
            message: _.data.successCount + '个邀请码添加成功, ' + _.data.failureCount + '个邀请码添加失败'
          })
          this.reloadInvitationCodes()
        }).catch(_ => {
          this.$message({
            type: 'error',
            message: _.message
          })
        })
      } else {
        adminUserRpc.importInvitationCodes({
          excelFile: this.$refs.uploadExcelFile.uploadFiles[0].raw,
          tagName: this.tagName,
          availableCount: this.availableCount,
          thresholdMoney: this.thresholdMoney
        }).then(_ => {
          this.$message({
            type: 'success',
            message: _.data.successCount + '个邀请码添加成功, ' + _.data.failureCount + '个邀请码添加失败'
          })
          this.reloadInvitationCodes()
        }).catch(_ => {
          this.$message({
            type: 'error',
            message: _.message
          })
        })
      }
    }
  },
  mounted () {
    this.refreshTagNames().then(_ => {}).catch(_ => {})
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
      padding-bottom: 40px;
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
