/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-03-01 15:10:21
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-01 15:13:12
 */
export const isObjectValueEqual = (obj1, obj2) => {
  // debugger
  if (obj1 === obj2) {
    // 常规情况
    return true
  }
  //  对象转json字符对比相同则肯定对象值相同这里可以过滤大部分情况
  if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
    return true
  }
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    // 属性字段列表长度不一致则肯定不相同
    return false
  }
  const kset = new Set([...keys1, ...keys2])
  const keys3 = Array.from(kset) // 长度相同的情况下取并集
  if (keys3.length !== keys2.length) {
    // 并集多于或者少于原始的则对象不相同
    return false
  }
  // 遍历属性
  for (let i = 0; i < keys3.length; i++) {
    const k = keys3[i]
    const o1 = obj1[k]
    const o2 = obj2[k]
    // 如果是对象(数组也是对象)则递归判断，这里没有考虑function的情况
    if (typeof o1 === 'object' && typeof o2 === 'object') {
      if (!isObjectValueEqual(o1, o2)) {
        return false
      }
    } else if (o1 !== o2) {
      return false
    }
  }
  return true
}

/**
 * 获取新旧对比值
 */
export const getModified = (oldValue, newValue) => {
  let returnValue = ''
  for (const key in oldValue) {
    if (oldValue[key] !== newValue[key]) {
      let oldValue1 = null
      let newValue1 = null
      // 如果获取到的值为空或者undefined，则设置为-1作标记
      if (
        oldValue[key] === undefined ||
        oldValue[key] === null ||
        oldValue[key] === ''
      ) {
        oldValue1 = '""'
      } else {
        oldValue1 = oldValue[key]
      }
      if (
        newValue[key] === undefined ||
        newValue[key] === null ||
        newValue[key] === ''
      ) {
        newValue1 = '""'
      } else {
        newValue1 = newValue[key]
      }
      returnValue =
        returnValue + key + ',旧值:' + oldValue1 + ',新值:' + newValue1 + ';'
    }
  }
  if (returnValue !== '') {
    returnValue = ' 修改 ' + returnValue
  }
  return returnValue
}

/**
 * 解析时间到字符串   // return 2020-11-04 13:56:22
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
