/**
 * @desc    用户基类 User.js
 * @author  yijie
 * @date    2020-09-28 14:15
 * @logs[0] 2020-09-28 14:15 yijie 创建了User.js文件
 */
import type WithCtimeMtime from '@cObj/WithCtimeMtime'

class User implements WithCtimeMtime {
  // 用户id
  id: number;
  // 用户名
  userName: string;
}

export default User
