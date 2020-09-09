/* eslint-disable */
/**
 * @desc      原生Number对象的公用方法
 *            谨慎添加，谨慎维护
 *            不要是个方法就往里面加，会导致Number对象过于复杂
 *            每次更改向下方logs添加更改信息
 * @author    yijie
 * @date      2020-08-11
 * @logs[0]   yijie 2020-08-11 添加头部注释
 */

/**
 * 将数字转化为缩写
 * @author      yijie
 * @date        2020-08-11
 * @articleUrl  (暂无)
 * @param       digits    小数点后保留位数
 * @param       unit_type 单位类型 en:英文单位,zh:中文单位
 * @returns     转化过后的字符串
 * @logs[0]     yijie 2020-08-11 创建方法
 */
Number.prototype.format = function (digits, unit_type) {
  const num = this.valueOf()
  const real_unit_type = unit_type || 'en'
  const si = {
    en: [
      { value: 1, symbol: '' },
      { value: 1E3, symbol: 'K' },
      { value: 1E6, symbol: 'M' },
      { value: 1E9, symbol: 'G' },
      { value: 1E12, symbol: 'T' },
      { value: 1E15, symbol: 'P' },
      { value: 1E18, symbol: 'E' }
    ],
    zh: [
      { value: 1, symbol: '' },
      { value: 1E3, symbol: '千' },
      { value: 1E6, symbol: '兆' },
      { value: 1E9, symbol: '吉' },
      { value: 1E12, symbol: '京' },
      { value: 1E15, symbol: '垓' },
      { value: 1E18, symbol: '秭' }
    ]
  }[real_unit_type]
  if (si === undefined) return '参数错误'
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}
