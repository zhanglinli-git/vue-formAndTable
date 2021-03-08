/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-03-05 14:19:30
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-08 10:47:31
 */
import store from '@/store'

export const directive = {
  inserted(el, binding, vnode) {
    const { value } = binding

    const hasPermission = hasPermissions(value)

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  },
}

export function hasPermissions(value) {
  let need = []
  if (typeof value === 'string') {
    need.push(value)
  } else if (value && value instanceof Array && value.length > 0) {
    need = need.concat(value)
  }
  if (need.length === 0) {
    return true
    // throw new Error('need permissions! Like v-permission="usersphere:user:view" ')
  }
  const codes = store.getters['codes']
  return codes?.some((code) => {
    return need.includes(code)
  })
}
