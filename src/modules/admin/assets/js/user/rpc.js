/**
 * @desc    admin.user rpc.js
 * @author  yijie
 * @date    2020-09-25 09:54
 * @logs[0] 2020-09-25 09:54 yijie 创建了rpc.js文件
 */
import axios from '@plugins/axios'

export default {
  /**
   * 搜索邀请码列表
   * @param invitationCode    String  N   ""  邀请码内容
   * @param creatorName       String  N   ""  创建者姓名
   * @param tagName           String  N   ""  标签名
   * @param page              int     N   1   页码
   * @param size              int     N   20  每页个数
   */
  searchInvitationCode ({ invitationCode, creatorName, tagName, page, size }) {
    return new Promise((resolve, reject) => {
      axios.get('/spring-api/admin/invitationCode/search', {
        params: {
          invitationCode, creatorName, tagName, page, size
        }
      }).then(_ => {
        if (_.code !== 200) {
          reject(_)
        } else {
          resolve(_)
        }
      }).catch(reject)
    })
  },
  /**
   * 根据json格式请求信息添加邀请码
   * @param invitationCodes   Array      Y   []  待添加的邀请码列表
   * @param tagName           String     Y   ""  标签名
   * @param availableCount    Integer    N   0   邀请码可用次数
   */
  addInvitationCodes ({ invitationCodes, tagName, availableCount }) {
    return new Promise((resolve, reject) => {
      axios.post('/spring-api/admin/invitationCode/list', {
        invitationCodes, tagName, availableCount
      }).then(_ => {
        if (_.code !== 200) {
          reject(_)
        } else {
          resolve(_)
        }
      }).catch(reject)
    })
  },
  /**
   * 根据json格式请求信息添加邀请码
   * @param excelFile         File      Y   ""  excel表格文件
   * @param tagName           String    Y   ""  标签名
   * @param availableCount    Integer   N   0   邀请码可用次数
   * @param thresholdMoney    String    N   0   邀请码录入数据库阈值
   */
  importInvitationCodes ({ excelFile, tagName, availableCount, thresholdMoney }) {
    const formData = new FormData(document.createElement('form'))
    formData.append('excelFile', excelFile)
    formData.append('tagName', tagName)
    formData.append('availableCount', availableCount)
    formData.append('thresholdMoney', thresholdMoney)
    return new Promise((resolve, reject) => {
      axios.post('/spring-api/admin/invitationCode/importFromExcel', formData).then(_ => {
        if (_.code !== 200) {
          reject(_)
        } else {
          resolve(_)
        }
      }, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).catch(reject)
    })
  },
  /**
   * 修改invitationCode
   * @param id                    Integer     Y   ""  邀请码id
   * @param invitationCode        String      N   ""  待添加的邀请码列表
   * @param tagName               String      N   ""  邀请码标签
   * @param availableInviteCount  Integer     N   0   邀请码可用次数
   * @param status                Integer     N   0   邀请码状态
   */
  changeInvitationCode ({ id, invitationCode, tagName, availableInviteCount, status }) {
    return new Promise((resolve, reject) => {
      axios.put('/spring-api/admin/invitationCode/one', {
        id, invitationCode, tagName, availableInviteCount, status
      }).then(_ => {
        if (_.code !== 200) {
          reject(_)
        } else {
          resolve(_)
        }
      }).catch(reject)
    })
  },
  /**
   * 删除invitationCode
   * @param id  Long     Y   ""  邀请码id
   */
  deleteInvitationCode ({ id }) {
    return new Promise((resolve, reject) => {
      axios.delete(`/spring-api/admin/invitationCode/one?id=${id}`
      ).then(_ => {
        if (_.code !== 200) {
          reject(_)
        } else {
          resolve(_)
        }
      }).catch(reject)
    })
  },
  /**
   * 获取invitationCode的所有tagName列表
   */
  getTagNames () {
    return new Promise((resolve, reject) => {
      axios.get('/spring-api/admin/invitationCode/tagNames'
      ).then(_ => {
        if (_.code !== 200) {
          reject(_)
        } else {
          resolve(_)
        }
      }).catch(reject)
    })
  }
}
