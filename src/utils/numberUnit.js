/*
 * @Descripttion: 该页面用于——用于对数值进行添加单位操作
 * @Author: zhanglinli
 * @Date: 2020-10-21 16:15:06
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-10-28 13:43:49
 */
const addWan = (integer, number, mutiple, decimalDigit) => {
  const digit = getDigit(integer)
  if (digit > 3) {
    let remainder = digit % 8
    if (remainder >= 5) {
      // ‘十万’、‘百万’、‘千万’显示为‘万’
      remainder = 4
    }
    const noDec =
      Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) /
      Math.pow(10, decimalDigit)
    const addDec =
      Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) /
        Math.pow(10, decimalDigit) +
      '万'
    return { dec: '万', noDec: noDec, addDec: addDec }
  } else {
    return (
      Math.round(number / Math.pow(10, mutiple - decimalDigit)) /
      Math.pow(10, decimalDigit)
    )
  }
}
const getDigit = (integer) => {
  let digit = -1
  while (integer >= 1) {
    digit++
    integer = integer / 10
  }
  return digit
}
export const addChineseUnit = (number, decimalDigit) => {
  decimalDigit = decimalDigit == null ? 2 : decimalDigit
  const integer = Math.floor(number)
  const digit = getDigit(integer)
  const unit = []
  if (digit > 3) {
    const multiple = Math.floor(digit / 8)
    if (multiple >= 1) {
      const tmp = Math.round(integer / Math.pow(10, 8 * multiple))
      unit.push(addWan(tmp, number, 8 * multiple, decimalDigit))
      for (let i = 0; i < multiple; i++) {
        unit.push('亿')
      }
      return unit.join('')
    } else {
      return addWan(integer, number, 0, decimalDigit)
    }
  } else {
    return number
  }
}
