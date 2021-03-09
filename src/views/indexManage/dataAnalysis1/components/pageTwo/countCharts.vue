<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-01-22 09:24:15
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-22 10:12:01
-->
<template>
  <ring2
    v-if="item&&extend"
    :data="item"
    :key-value="new Date().getTime()"
    :extend="extend"
    :width="95"
    :height="202"
  />
</template>

<script>
import { Ring2 } from '@/components'
export default {
  name: 'CountCharts',
  components: { Ring2 },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      extend: {
        color: ['#2D8CF0', '#FFF'],
      },
    }
  },
}
</script>
