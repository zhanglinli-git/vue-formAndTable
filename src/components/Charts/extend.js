/*
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-24 14:31:05
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-10-28 11:04:59
 */

export const getNewOptions = (options, extend) => {
  Object.keys(extend).forEach((attr) => {
    const value = extend[attr]
    if (Object.prototype.toString.call(value) === '[object Object]') {
      for (const key in value) {
        if (Object.prototype.toString.call(value[key]) === '[object Object]') {
          for (const newKey in value[key]) {
            if (
              Object.prototype.toString.call(value[key][newKey]) ===
              '[object Object]'
            ) {
              for (const finKey in value[key][newKey]) {
                options[attr][key][newKey][finKey] = value[key][newKey][finKey]
              }
            } else {
              options[attr][key][newKey] = value[key][newKey]
            }
          }
        } else {
          options[attr][key] = value[key]
        }
      }
    } else {
      options[attr] = value
    }
  })
  return options

  // Object.keys(extend).forEach((attr) => {
  //   const value = extend[attr]
  //   if (~attr.indexOf('.')) {
  //     // eg: a.b.c a.1.b
  //     set(options, attr, value)
  //   } else if (typeof value === 'function') {
  //     // get callback value
  //     options[attr] = value(options[attr])
  //   } else {
  //     // mixin extend value
  //     if (isArray(options[attr]) && isObject(options[attr][0])) {
  //       // eg: [{ xx: 1 }, { xx: 2 }]
  //       options[attr].forEach((option, index) => {
  //         options[attr][index] = Object.assign({}, option, value)
  //       })
  //     } else if (isObject(options[attr])) {
  //       // eg: { xx: 1, yy: 2 }
  //       options[attr] = Object.assign({}, options[attr], value)
  //     } else {
  //       options[attr] = value
  //     }
  //   }
  // })
  // return options
}
