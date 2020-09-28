/**
 * @desc    操作前确认装饰器 operatePreConfirm.js
 * @author  yijie
 * @date    2020-09-28 14:00
 * @logs[0] 2020-09-28 14:00 yijie 创建了operatePreConfirm.js文件
 */
import { MessageBox } from 'element-ui'

/**
 * 带有输入操作的确认弹窗装饰器
 * @param title             标题
 * @param inputPattern      输入框校验
 * @param inputErrorMessage 输入框校验失败时的提示信息
 * @returns {function(*, *, *): void}
 */
const InputOperatePreConfirm = ({ title, inputPattern, inputErrorMessage }) => {
  /**
   * @param target      对应 methods 这个对象
   * @param name        对应属性方法的名称
   * @param descriptor  对应属性方法的修饰符
   */
  return function (target, name, descriptor) {
    const originFUn = descriptor.value
    descriptor.value = function (...args) {
      MessageBox.prompt(title, '', {
        confirmButtonText: '确认修改',
        cancelButtonText: '取消',
        inputPattern: inputPattern,
        inputErrorMessage: inputErrorMessage
      }).then(({ value }) => {
        originFUn.call(this, value)
      }).catch(_ => {})
    }
  }
}

export { InputOperatePreConfirm }
