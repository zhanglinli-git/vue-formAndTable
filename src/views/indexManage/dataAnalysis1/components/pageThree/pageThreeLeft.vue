<!--
 * @Descripttion: 类型比例环形图
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:07:10
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-09 10:01:47
-->
<template>
  <div>
    <el-card v-loading="loading">
      <div class="item-title">数据分布总览饼图</div>
      <pie v-if="data.series.length>0" :data="data" key-value="1" />
    </el-card>
  </div>
</template>

<script>
import { Pie } from '@/components'
import { spreadOver } from '@/api/dataAnalysis'

export default {
  name: 'PageThreeLeft',
  components: { Pie },
  data() {
    return {
      loading: false,
      dateValue: '',
      titles: ['电子保单', '纸质保单', '电子信函', '纸质信函'],
      // 类型比例
      data: {
        legendData: [],
        series: [],
      },
    }
  },
  created() {
    this.spreadOver()
  },
  methods: {
    spreadOver() {
      this.loading = true
      spreadOver()
        .then((res) => {
          this.data.legendData = res.data.data.map((d) => {
            this.data.series.push(d)
            return d.name
          })
          this.loading = false
        })
        .catch((e) => {
          console.log(e)
          this.data.legendData = this.titles.map((t) => {
            this.data.series.push({ name: t, value: 0 })
            return t
          })
          this.loading = false
        })
    },
  },
}
</script>

<style scoped>
.el-card {
  border-radius: 10px !important;
}
</style>
