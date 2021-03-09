<!--
 * @Descripttion: 类型比例环形图
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:07:10
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-10-26 09:24:52 
-->
<template>
  <div v-loading="loading">
    <div class="item-title">数据分布总览饼图</div>
    <rosa v-if="data" :data="data" key-value="1" />
  </div>
</template>

<script>
import { Rosa } from '@/components'

export default {
  name: 'PageThreeLeft',
  components: { Rosa },
  data() {
    return {
      loading: false,
      dateValue: '',
      // 类型比例
      data: {
        legendData: ['电子保单', '纸质保单', '电子信函', '纸质信函'],
        series: [
          {
            value: 25,
            name: '电子保单',
          },
          {
            value: 26,
            name: '纸质保单',
          },
          {
            value: 22,
            name: '电子信函',
          },
          {
            value: 27,
            name: '纸质信函',
          },
        ],
      },
    }
  },
}
</script>

<style scoped>
.item-title {
  position: absolute;
  top: 30px;
  left: 100px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(0, 132, 255);
}
</style>
