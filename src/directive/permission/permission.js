
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
  }
  const codes = ['wllxsc']
  return codes?.some((code) => {
    return need.includes(code)
  })
}
