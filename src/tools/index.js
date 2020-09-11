/**
 * @desc      开发状态下的可使用的hack tool类 index.js
 * @author    yijie
 * @date      2020-09-12
 * @logs[0]   yijie 2020-09-12 创建了文件index.js
 */
const hackPrePrint = (target, name, descriptor) => {
  target['old_' + name] = descriptor.value
  descriptor.value = function () {
    console.log('调用了一个development环境下的hack方法')
    target['old_' + name](...arguments)
  }
  return descriptor
}

class Hack {
  /**
   * 删除登陆的session信息
   */
  @hackPrePrint
  logout () {
    sessionStorage.removeItem('sessionToken')
    location.reload()
  }
}
if (process.env.NODE_ENV === 'development') {
  window.hack = new Hack()
}
