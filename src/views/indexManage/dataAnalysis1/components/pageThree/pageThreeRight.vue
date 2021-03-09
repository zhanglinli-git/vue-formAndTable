<!--
 * @Descripttion: 类型比例环形图
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:07:10
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-22 15:27:22
-->
<template>
  <el-card>
    <div class="item-title">时效指标雷达图</div>
    <radar v-if="data.indicator.length>0" key-value="2" :data="data" />
  </el-card>
</template>

<script>
import { Radar } from '@/components'
import { processHistTimeRadar } from '@/api/dataAnalysis'

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
        indicator: [],
        series: [
          {
            value: [],
            name: '保单',
          },
          {
            value: [],
            name: '信函',
          },
        ],
      },
    }
  },
  created() {
    this.processHistTimeRadar()
  },
  methods: {
    processHistTimeRadar() {
      this.loading = true
      processHistTimeRadar()
        .then((res) => {
          let data = res.data.data
          let letter = data.letter
          let policy = data.policy
          Object.keys(letter).forEach((key) => {
            let letterElement = letter[key]
            let policyElement = policy[key]
            let maxTotal =
              letterElement.total > policyElement.total
                ? letterElement.total
                : policyElement.total
            this.data.indicator.push({
              name: letterElement.label,
              max: maxTotal,
            })
            this.data.series[0].value.push(policyElement.total)
            this.data.series[1].value.push(letterElement.total)
          })
          this.loading = false
        })
        .catch((e) => {
          console.error(e)
        })
    },
  },
}
</script>

<style scoped>
.el-card {
  border-radius: 10px !important;
  margin-left: 20px !important;
}
</style>
