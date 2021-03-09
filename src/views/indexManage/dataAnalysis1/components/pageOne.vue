<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:26:44
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-09 11:40:20
-->
<template>
  <div>
    <p class="title">基本数据</p>
    <el-row :key="loading" v-loading="loading" type="flex" justify="space-between">
      <template v-for="(item,index) in data.length">
        <el-col :key="index" :span="6" :style="index !== 0 ? 'margin-left:20px':''" class="top-one">
          <el-card>
            <div class="top-one-textTitle">{{ data[index].textTitle }}</div>
            <div class="top-one-total">
              <count-to :start-val="0" :end-val="parseFloat(data[index].total)" :duration="3000" />
            </div>
            <div>
              <week-charts :id="index" :item="data[index].chartData" />
            </div>
            <div class="top-one-four">
              <week-and-day :id="data[index].textTitle+index" :item="data[index]" />
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import WeekAndDay from './pageOne/weekAndDay'
import WeekCharts from './pageOne/weekCharts'
import { base } from '@/api/dataAnalysis'
import CountTo from 'vue-count-to'
import lodash from 'lodash'

export default {
  name: 'PageOne',
  components: {
    WeekAndDay: () => import('./pageOne/weekAndDay'),
    WeekCharts: () => import('./pageOne/weekCharts'),
    CountTo,
  },
  data() {
    return {
      textTitle: [
        '总体单量统计',
        '电子保单单量',
        '纸质保单单量',
        '电子信函单量',
        '纸质信函单量',
      ],

      data: [],
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    this.textTitle.forEach((t) => {
      const totalData = { ...dataTemplate, textTitle: t }
      totalData.chartData.series[0].name = t
      this.data.push(totalData)
    })
    setTimeout(this.base(), 100)
  },
  methods: {
    base() {
      this.loading = true
      base()
        .then((res) => {
          this.data = []
          this.loading = false
          res.data.data.forEach((d) => {
            const totalData = {
              ...lodash.cloneDeep(dataTemplate),
              textTitle: d.name,
              total: d.total,
              day: d.dayRangeRingRatio,
              week: d.weekRangeRingRatio,
            }
            totalData.chartData.series[0].name = d.name
            if (d.weekLine) {
              totalData.chartData.series[0].data = d.weekLine
                .map((wl) => wl.total)
                .map(Number)
              totalData.chartData.xData = d.weekLine.map((wl) => wl.date)
            }
            this.data.push(totalData)
          })
        })
        .catch((e) => {
          this.data = []
          this.textTitle.forEach((t) => {
            const totalData = { ...dataTemplate, textTitle: t }
            totalData.chartData.series[0].name = t
            this.data.push(totalData)
          })
          this.loading = false
          console.error(e)
        })
    },
  },
}

const dataTemplate = {
  textTitle: '',
  total: 0,
  day: 0,
  week: 0,
  chartData: {
    xData: [],
    series: [
      {
        name: '',
        data: [],
      },
    ],
  },
}
</script>
<style scoped>
.title {
  font-size: 19px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: #000000;
  opacity: 1;
}
.top-one-textTitle {
  font-size: 12px;
  color: #c3c3c3;
  margin-bottom: 10px;
}
.top-one-total {
  font-size: 22px;
  margin-bottom: 10px;
}
.top-one-four {
  border-top: 1px solid rgb(201, 200, 200);
  margin: -5px -20px -10px -20px;
  padding: 10px 20px 0px 20px;
}
.el-card {
  border-radius: 10px !important;
}
</style>
