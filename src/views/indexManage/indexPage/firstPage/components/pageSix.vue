<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:32:38
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-18 14:50:18
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix container-page-title">
      <el-row type="flex" justify="space-between">
        <span class="title">
          <el-button
            type="primary"
            icon="el-icon-s-data"
            circle
            size="mini"
            plain
            style="margin-right:8px"
          />信函统计
        </span>
        <span>
          <template v-for="item in pickerOptions">
            <el-button
              :key="item.id"
              type="text"
              size="medium"
              @click="item.onClick"
            >{{ item.text }}</el-button>
          </template>
          <el-date-picker
            v-model="dateValue"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="margin-left:20px"
            @change="changeChartData"
          />
        </span>
      </el-row>
    </div>

    <div class="container-page-main">
      <change-charts v-if="histogramData" :data="histogramData" key-value="2" />
    </div>
  </el-card>
</template>

<script>
import { ChangeCharts } from '@/components'
import { mapGetters } from 'vuex'
import { policyStatistics } from '@/api/firstPageApi'
import { parseTime } from '@/utils'
import { getDate, getMonday, getMonth, getYear } from '@/utils/getTime'

export default {
  components: { ChangeCharts },
  data() {
    return {
      pickerOptions: [],
      dateValue: [],
      histogramData: {
        xData: [],
        xName: '进程类型',
        series: [
          {
            name: '正常',
            type: 'bar',
            data: [],
          },
          {
            name: '异常',
            type: 'bar',
            data: [],
          },
          {
            name: '未完成',
            type: 'bar',
            data: [],
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    this.dateValue = [parseTime(new Date()), parseTime(new Date())]
    this.fetchData()
    this.getOptions()
  },
  methods: {
    async fetchData(beginTime = null, endTime = null, jobType = 2) {
      await policyStatistics({ beginTime, endTime, jobType }).then(
        (response) => {
          const series = response.data.data.series
          const xdata = response.data.data.xdata
          if (series) {
            this.histogramData.xData = xdata
            series.forEach((item, index) => {
              this.histogramData.series[index].data = item.data
            })
          } else {
            this.$Confirm.handleAlert('信函统计失败！', 'error')
          }
        }
      )
    },
    changeChartData(date) {
      if (date) {
        this.fetchData(date[0], date[1], 1)
      }
    },
    getOptions() {
      this.pickerOptions = [
        {
          id: '1',
          text: '今日',
          onClick: () => {
            this.dateValue = [parseTime(getDate(0)), parseTime(getDate(0))]
            this.fetchData(this.dateValue[0], this.dateValue[1], 1)
          },
        },
        {
          id: '2',
          text: '本周',
          onClick: () => {
            this.dateValue = [
              parseTime(getMonday('s')),
              parseTime(getMonday('e')),
            ]
            this.fetchData(this.dateValue[0], this.dateValue[1], 1)
          },
        },
        {
          id: '3',
          text: '本月',
          onClick: () => {
            this.dateValue = [
              parseTime(getMonth('s')),
              parseTime(getMonth('e')),
            ]
            this.fetchData(this.dateValue[0], this.dateValue[1], 1)
          },
        },
        {
          id: '4',
          text: '全年',
          onClick: () => {
            this.dateValue = [parseTime(getYear('s')), parseTime(getYear('e'))]
            this.fetchData(this.dateValue[0], this.dateValue[1], 1)
          },
        },
      ]
    },
  },
}
</script>

<style scoped>
.title {
  color: #515a6e;
}
</style>
