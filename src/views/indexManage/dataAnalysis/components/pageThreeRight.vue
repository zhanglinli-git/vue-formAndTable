<!--
 * @Descripttion: 类型比例环形图
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:07:10
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-10-26 10:30:38 
-->
<template>
  <div v-loading="loading" style="margin-top:30px">
    <div class="item-title">时效指标雷达图</div>
    <radar v-if="data" key-value="2" :data="data" />
  </div>
</template>

<script>
import { Radar } from '@/components'

export default {
  name: 'PageThreeRight',
  components: { Radar },
  data() {
    return {
      loading: false,
      dateValue: '',
      // 时效指标雷达图
      data: {
        legendData: ['保单', '信函'],
        indicator: [
          { name: '数据处理', max: 6500 },
          { name: '数据打印', max: 16000 },
          { name: 'PDF生成', max: 30000 },
          { name: '数据审核', max: 38000 },
          { name: '邮件发送', max: 52000 },
          { name: '数据分发', max: 25000 },
        ],
        series: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '保单',
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '信函',
          },
        ],
      },
    }
  },
}
</script>

<style scoped>
.item-title {
  font-size: 20px;
  font-weight: bold;
  color: rgb(0, 132, 255);
  text-align: center;
}
</style>
