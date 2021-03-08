import { directive, hasPermissions } from './permission'
const install = function(Vue) {
  Vue.directive('permission', directive)
  Vue.prototype.hasPermissions = hasPermissions
}

if (window.Vue) {
  window.permission = directive
  Vue.use(install) // eslint-disable-line
}

directive.install = install
export default directive
