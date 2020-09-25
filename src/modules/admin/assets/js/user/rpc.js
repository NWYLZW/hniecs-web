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
  search ({ invitationCode, creatorName, tagName, page, size }) {
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
  }
}
