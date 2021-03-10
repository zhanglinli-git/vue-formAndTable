/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-01-13 16:40:58
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-13 17:14:14
 */

// getDate(dates) // dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
export const getDate = (dates) => {
  const dd = new Date()
  const n = dates || 0
  dd.setDate(dd.getDate() + n)
  const y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  const day = y + '-' + m + '-' + d
  return new Date(day.replace(/-/, '/'))
}

export const getMonday = (type, dates) => {
  const now = new Date()
  const nowTime = now.getTime()
  const day = now.getDay()
  const longTime = 24 * 60 * 60 * 1000
  const n = longTime * 7 * (dates || 0)
  let dd = ''
  if (type === 's') {
    dd = nowTime - (day - 1) * longTime + n
  }
  if (type === 'e') {
    dd = nowTime + (7 - day) * longTime + n
  }
  dd = new Date(dd)
  const y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  const time = y + '-' + m + '-' + d
  return new Date(time.replace(/-/, '/'))
}

// getMonday(type,dates)  //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
// getMonday("s",1)  //得到下周一的yyyy-mm-dd格式日期
// getMonday("e",1)  //得到下周日的yyyy-mm-dd格式日期

export const getMonth = (type, months) => {
  const d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  if (Math.abs(months) > 12) {
    months = months % 12
  }
  if (months) {
    if (month + months > 12) {
      year++
      month = (month + months) % 12
    } else if (month + months < 1) {
      year--
      month = 12 + month + months
    } else {
      month = month + months
    }
  }
  month = month < 10 ? '0' + month : month
  const firstday = year + '-' + month + '-' + '01'
  let lastday = ''
  if (
    month === '01' ||
    month === '03' ||
    month === '05' ||
    month === '07' ||
    month === '08' ||
    month === '10' ||
    month === '12'
  ) {
    lastday = year + '-' + month + '-' + 31
  } else if (month === '02') {
    if (
      (year % 4 === 0 && year % 100 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    ) {
      lastday = year + '-' + month + '-' + 29
    } else {
      lastday = year + '-' + month + '-' + 28
    }
  } else {
    lastday = year + '-' + month + '-' + 30
  }
  let day = ''
  if (type === 's') {
    day = firstday
  } else {
    day = lastday
  }
  return day
}

// getMonth(type, months) // type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月
// getMonth('s', 1) // 得到下月第一天的yyyy-mm-dd格式日期
// getMonth('e', 1) // 得到下月最后一天的yyyy-mm-dd格式日期

export const getYear = (type, dates) => {
  const dd = new Date()
  const n = dates || 0
  const year = dd.getFullYear() + Number(n)
  let day = ''
  if (type === 's') {
    day = year + '-01-01'
  }
  if (type === 'e') {
    day = year + '-12-31'
  }
  if (!type) {
    day = year + '-01-01/' + year + '-12-31'
  }
  return new Date(day.replace(/-/, '/'))
}

// getYear(type, dates) // type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表今年，-1代表去年，1代表明年
// getYear('s', 1) // 得到明年第一天的yyyy-mm-dd格式日期
// getYear('e', 1) // 得到明年最后一天的yyyy-mm-dd格式日期export
