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
   * invitationCodes   Array      Y   []  待添加的邀请码列表
   * tagName           String     Y   ""  标签名
   * availableCount    Integer    N   0   邀请码可用次数
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
  }
}
