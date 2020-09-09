/**
 * @Description mock 的帮助类js
 * @Author      yijie
 * @Date        2020-08-27

 * @logs[0]     yijie 2020-08-27 创建了文件tool.js
 */

// 返回响应码的枚举值
const returnJsons = {
  SUCCESS: {
    error_code: '0',
    error_msg: '成功'
  },
  NO_CONFIGURATION_RETURN_MODEL: {
    error_code: '1',
    error_msg: '未配置返回model值'
  }
}
/**
 * 包装返回值
 * @returns {function(*, *, *): *}
 */
function packageReturn () {
  /**
     * target       被装饰的对象
     * name         被装饰的函数名
     * descriptor   被传递过来的属性的属性描述符
     *              可以通过Object.getOwnPropertyDescriptor()方法来查看属性描述符。
     */
  return (target, name, descriptor) => {
    // 必须使用descriptor.value获取老函数，不然的话由于上一层装饰器没有返回，是不会更改内容的
    target['package_return_old_' + name] = descriptor.value
    function newFun () {
      const
        // arguments是一个参数数组，传下级装饰器的时候需要进行解码操作
        originReturnVal = target['package_return_old_' + name](...arguments)
      const model = originReturnVal.$model$
      delete originReturnVal.$model$

      return {
        ...(returnJsons[model] || returnJsons.NO_CONFIGURATION_RETURN_MODEL),
        ...originReturnVal
      }
    }
    descriptor.value = newFun
    return descriptor
  }
}
export { returnJsons, packageReturn }

const tool = {
  /**
     * 对模版函数进行分页处理
     * @param maxNum               最大页数
     * @param defaultValue         默认值字典
     * @param specialName          为page与num设置特殊的名字
     * @param specialReturnModel  设置成功与失败时特殊的返回模式
     */
  pagination (maxNum, defaultValue, specialName, specialReturnModel) {
    const
      numName = (specialName && specialName.num) || 'num'
    const pageName = (specialName && specialName.page) || 'page'
    const countName = (specialName && specialName.count) || 'count'
    const successReturnModel = (specialReturnModel && specialReturnModel.success) || 'SUCCESS'
    const errorReturnModel = (specialReturnModel && specialReturnModel.error) || 'SUCCESS'

    /**
         * target       被装饰的对象
         * name         被装饰的函数名
         * descriptor   被传递过来的属性的属性描述符
         *              可以通过Object.getOwnPropertyDescriptor()方法来查看属性描述符。
         */
    return (target, name, descriptor) => {
      target['tool_pagination_old_' + name] = target[name]
      function newFun () {
        const { method, queryObj, postObj } = arguments[0]
        const page = queryObj[pageName] || (defaultValue && defaultValue.page) || 1
        const num = queryObj[numName] || (defaultValue && defaultValue.num) || 10
        if (
          page * num > (Math.floor(maxNum / num) + 1) * num
        ) {
          return {
            $model$: errorReturnModel,
            data: []
          }
        }
        const template = target['tool_pagination_old_' + name]({ method, queryObj, postObj })
        const data = {}
        data[countName] = maxNum
        data.data = (_ => {
          const tempList = []

          function dealTemplate (template) {
            const item = {}
            for (const templateKey in template) {
              if (typeof template[templateKey] === 'function') {
                item[templateKey] = template[templateKey]()
              } else if (typeof template[templateKey] === 'object') {
                if (template[templateKey] instanceof Array) {
                  item[templateKey] = template[templateKey]
                } else {
                  item[templateKey] = dealTemplate(template[templateKey])
                }
              } else {
                item[templateKey] = template[templateKey]
              }
            }
            return item
          }

          for (let i = 0; i < num; i++) {
            const instance = dealTemplate(template)
            tempList.push(instance)
          }
          return tempList
        })()
        return {
          $model$: successReturnModel,
          ...data
        }
      }
      descriptor.value = newFun
      return descriptor
    }
  }
}
export default tool
