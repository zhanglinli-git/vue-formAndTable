/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-03-01 14:52:26
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-01 15:50:18
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'vue demo'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
