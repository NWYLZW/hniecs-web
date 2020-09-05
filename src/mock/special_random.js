/**
 * @Description 项目特殊的随机函数
 * @Author      fengzili
 * @Date        2020-08-27

 * @logs[0]     fengzili 2020-08-27 创建了文件special_random.js
 */
import { Random } from 'mockjs'

Random.extend({
  stage () {
    return this.pick([
      '小学', '初中', '高中'
    ])
  },
  grade () {
    const stage = this.stage()
    const gradeLevels = [
      '一年级', '二年级', '三年级',
      '四年级', '五年级', '六年级'
    ]
    if (stage === '小学') {
      return stage + this.pick(gradeLevels)
    } else if (stage === '初中' || stage === '高中') {
      return stage + this.pick(gradeLevels.slice(0, 3))
    }
  },
  subject () {
    return this.pick([
      '语文', '数学', '英语',
      '生物', '化学', '物理',
      '政治', '历史', '地理',
      '音乐', '美术', '计算机'
    ])
  },
  course () {
    return this.grade() + this.subject()
  }
})
export default Random
