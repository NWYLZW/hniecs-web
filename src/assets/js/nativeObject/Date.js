/* eslint-disable */
/**
 * @desc      原生Date对象的公用方法
 *            谨慎添加，谨慎维护
 *            不要是个方法就往里面加，会导致Date对象过于复杂
 *            每次更改向下方logs添加更改信息
 * @author    yijie
 * @date      2020-08-10
 * @logs[0]   yijie 2020-08-11 添加头部注释
 * @logs[1]   yijie 2020-08-20 添加计算时间差值方法
 */

/**
 * 将时间以指定格式转化
 * 使用参考:
 * (new Date(log.ctime*1000).format("yy/MM/dd hh:mm"))
 * @author      yijie
 * @date        2020-08-10
 * @articleUrl  (暂无)

 * @param       fmt(转化格式字符串)
 * @returns     转化后的指定时间格式字符串
 * @logs[0]     yijie 2020-08-11 添加头部注释
 */
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '')) }
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}
/**
 * 计算时间差值
 * @author          yijie
 * @date            2020-08-19
 * @articleUrl      (暂无)

 * @param           countDate  相差点 不传值时默认当前时间点
 * @param           fmts        转化数组，格式
 * {
        // 传入str时忽略fun
        'in-60-sec'      : {str: '',fun(date_obj, d_sec    ){}}
        'in-60-min'      : {str: '',fun(date_obj, d_min    ){}}
        'in-12-hour'     : {str: '',fun(date_obj, d_hour   ){}}
        'in-24-hour'     : {str: '',fun(date_obj, d_hour   ){}}
        'in-2-day'       : {str: '',fun(date_obj, d_day    ){}}
        'in-3-day'       : {str: '',fun(date_obj, d_day    ){}}
        'in-30-day'      : {str: '',fun(date_obj, d_day    ){}}
        'in-12-moun'     : {str: '',fun(date_obj, d_moun   ){}}
        'out-control'    : {str: '',fun(date_obj           ){}}
 * }
 * @returns         计算过后的差值
 * @logs[0]
 */
Date.prototype.countDifference = function (countDate, fmts) {
  countDate = countDate || new Date()
  const d_moun = parseInt(countDate - this) / 1000 / 60 / 60 / 24 / 30
  const d_day = parseInt(countDate - this) / 1000 / 60 / 60 / 24
  const d_hour = parseInt(countDate - this) / 1000 / 60 / 60
  const d_min = parseInt(countDate - this) / 1000 / 60
  const d_sec = parseInt(countDate - this) / 1000
  if (d_sec < 60) {
    const fmt_obj = fmts && fmts['in-60-sec']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this, d_sec)))) ||
            '刚刚'
  } else if (d_min < 60) {
    const fmt_obj = fmts && fmts['in-60-min']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this, d_min)))) ||
            Math.floor(d_min) + '分钟以前'
  } else if (d_hour < 12) {
    const fmt_obj = fmts && fmts['in-12-hour']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this, d_hour)))) ||
            Math.floor(d_hour) + '小时以前'
  } else if (d_hour < 24) {
    const fmt_obj = fmts && fmts['in-24-hour']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this, d_hour)))) ||
            this.format('hh:mm')
  } else if (d_day < 2) {
    const fmt_obj = fmts && fmts['in-2-day']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this, d_day)))) ||
            '昨天' + this.format('hh:mm')
  } else if (d_day < 3) {
    const fmt_obj = fmts && fmts['in-3-day']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this, d_day)))) ||
            '前天' + this.format('hh:mm')
  } else if (d_moun > 1) {
    const fmt_obj = fmts && fmts['in-30-day']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this, d_day)))) ||
            this.format('本月dd日 hh:mm')
  } else if (d_moun < 12) {
    const fmt_obj = fmts && fmts['in-12-moun']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this, d_moun)))) ||
            this.format('MM月dd日 hh:mm')
  } else {
    const fmt_obj = fmts && fmts['out-control']
    return (fmt_obj && (fmt_obj.str || (fmt_obj.fun && fmt_obj.fun(this)))) ||
            this.format('yy年MM月dd日 hh:mm')
  }
}
