<!--
 * @Descripttion: 类型比例环形图
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:07:10
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-02-02 15:35:57
-->
<template>
  <div v-loading="loading">
    <el-row class="item-title" type="flex" justify="space-between">
      <div style="margin-bottom:40px;line-height:28px">类型比例</div>
      <div>
        <el-date-picker
          v-model="dateValue"
          style="width: 250px"
          size="mini"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeChartData"
        />
      </div>
    </el-row>
    <el-row type="flex" justify="center">
      <ring
        v-if="data.series.length>0"
        :data="data"
        key-value="1"
        :extend="data.extend"
        style="margin-top:-50px"
      />
    </el-row>
  </div>
</template>

<script>
import { Ring } from '@/components'
import { type } from '@/api/platformData'
import { getDate } from '@/utils/filter'

export default {
  name: 'ShowType',
  components: { Ring },
  data() {
    return {
      loading: false,
      dateValue: [],
      // 类型比例
      data: {
        extend: {
          title: {
            left: '19%',
            top: '43%',
          },
        },
        legendData: [],
        series: [],
      },
    }
  },
  created() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0)
    this.dateValue = [start, end]
    this.fetchData(getDate(start), getDate(end))
  },
  methods: {
    async fetchData(startTime = null, endTime = null) {
      this.loading = true
      await type({ startTime, endTime })
        .then((response) => {
          const data = response.data.data
          if (data) {
            const series = []
            const legendData = []
            data.forEach((d) => {
              const { total: value, type: name } = d
              legendData.push(name)
              series.push({ value: value, name: name })
            })
            this.data.series = series
            this.data.legendData = legendData
          } else {
            this.$Confirm.handleAlert(`类型比例数据获取失败！`, 'error')
          }
        })
        .catch((error) => {
          this.$Confirm.handleAlert(error, 'error')
        })
      this.loading = false
    },
    changeChartData(date) {
      if (date) {
        this.fetchData(date[0], date[1])
      }
    },
  },
}
</script>
