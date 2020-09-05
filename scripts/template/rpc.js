/**
 * @desc        {moduleName}模块 rpc接口层文件 rpc.js
 * @author      {author}
 * @date        {createDate}

 * @logs[0]     {author} {createDate} 创建了rpc.js文件
 */
// mock拦截ajax请求 伪造假数据
// import '@/mock';
//库函数
import library from '@/module/common/js/library';
library.set_special_domain({
  // 'api_path' : '/mock_api',
});

export default {
  /**
   * @desc    接口介绍信息
   *          参数名     是否必填   参数类型   默认值   解释
   * @params  xxx       Y         int               xxx
   */
  template_method(params) {
    return library.ajax_get(
      'api_path',
      'template_method',
      params
    );
  }
}
