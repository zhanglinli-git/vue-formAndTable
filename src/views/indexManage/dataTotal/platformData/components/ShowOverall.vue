<template>
  <div v-loading="ztfbLoading">
    <el-row class="item-title" type="flex" justify="space-between">
      <div style="margin-bottom:40px;line-height:28px">整体分布</div>
      <div>
        <el-date-picker
          v-model="dateValue"
          size="mini"
          style="width: 250px"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeChartData"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
    </el-row>
    <change-charts v-if="data.series.length > 0 " :data="data" :extend="data.extend" key-value="1" />
  </div>
</template>

<script>
import { ChangeCharts } from '@/components'
import { overallDistribution } from '@/api/platformData'
import { handleAlert } from '@/utils/confirm'
import { getDate} from '@/utils/filter'

export default {
  name: 'ShowOverall',
  components: { ChangeCharts },
  data() {
    return {
      // 整体分布柱形图堆栈数据
      ztfbData: [],
      ztfbCharts: [],
      ztfbLoading: true,
      data: {
        extend: {
          toolbox: {
            feature: {
              dataView: {
                optionToContent: (opt) => {
                  return this.optionToContent(opt)
                },
              },
            },
          },
        },
        xData: [],
        xName: '数据类型',
        series: [],
      },
      dateValue: [],
    }
  },
  created() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    this.dateValue = [start,end]
    this.fetchData(getDate(start),getDate(end))
  },
  methods: {
    async fetchData(startTime, endTime) {
      this.ztfbLoading = true
      let ztfbCharts = null
      await overallDistribution({ startTime, endTime }).then((response) => {
        ztfbCharts = response.data.data
      })
      if (ztfbCharts) {
        this.ztfbCharts = ztfbCharts
        this.data.xData = this.gethSeriesData('typeName', ztfbCharts)
        this.data.series = [
          {
            name: '完成-电子保单',
            type: 'bar',
            stack: '完成',
            data: this.gethSeriesData('finishElectronPolicy', ztfbCharts),
            // formatter: (value) => { return value+'千元'}
          },
          {
            name: '完成-电子信函',
            type: 'bar',
            stack: '完成',
            data: this.gethSeriesData('finishElectronLetter', ztfbCharts),
          },
          {
            name: '进行-电子保单',
            type: 'bar',
            stack: '进行',
            data: this.gethSeriesData('processingElectronPolicy', ztfbCharts),
          },
          {
            name: '进行-电子信函',
            type: 'bar',
            stack: '进行',
            data: this.gethSeriesData('processingElectronLetter', ztfbCharts),
          },
          {
            name: '异常-电子保单',
            type: 'bar',
            stack: '异常',
            data: this.gethSeriesData('errorElectronPolicy', ztfbCharts),
          },
          {
            name: '异常-电子信函',
            type: 'bar',
            stack: '异常',
            data: this.gethSeriesData('errorElectronLetter', ztfbCharts),
          },
          {
            name: '完成-纸质保单',
            type: 'bar',
            stack: '完成',
            data: this.gethSeriesData('finishPaperPolicy', ztfbCharts),
          },
          {
            name: '完成-纸质信函',
            type: 'bar',
            stack: '完成',
            data: this.gethSeriesData('finishPaperLetter', ztfbCharts),
          },
          {
            name: '进行-纸质保单',
            type: 'bar',
            stack: '进行',
            data: this.gethSeriesData('processingPaperPolicy', ztfbCharts),
          },
          {
            name: '进行-纸质信函',
            type: 'bar',
            stack: '进行',
            data: this.gethSeriesData('processingPaperLetter', ztfbCharts),
          },
          {
            name: '异常-纸质保单',
            type: 'bar',
            stack: '异常',
            data: this.gethSeriesData('errorPaperPolicy', ztfbCharts),
          },
          {
            name: '异常-纸质信函',
            type: 'bar',
            stack: '异常',
            data: this.gethSeriesData('errorPaperLetter', ztfbCharts),
          },
        ]
        console.log(this.data)
      } else {
        handleAlert('整体分布数据获取失败！', 'error')
      }
      this.ztfbLoading = false
    },
    gethSeriesData(type, data) {
      const newData = []
      for (const item of data) {
        for (const o of Object.keys(item)) {
          if (o === type) {
            newData.push(item[type])
          }
        }
      }
      return newData
    },

    changeChartData(date) {
      if (date) {
        this.fetchData(date[0], date[1])
      }
    },
    optionToContent(opt) {
      let listMap = [
        { type: 'ElectronPolicy', typeName: '电子保单' },
        { type: 'PaperPolicy', typeName: '纸质保单' },
        { type: 'ElectronLetter', typeName: '电子信函' },
        { type: 'PaperLetter', typeName: '纸质信函' },
      ]
      let types = []
      this.ztfbCharts.forEach((z) => {
        for (let map of listMap) {
          for (const key of Object.keys(z)) {
            let lastIndexOf = key.lastIndexOf(map.type)
            if (lastIndexOf > 0) {
              let newKey = key.substring(0, lastIndexOf) + z.type
              map[newKey] = z[key]
            }
            if (key === `type` && !types.includes(z[key])) {
              types.push(z[key])
            }
          }
        }
      })
      const axisData = opt.xAxis[0].data // 坐标数据
      // const series = opt.series // 折线图数据
      // 定义table
      let table = `<table border="2" cellspacing="0" cellpadding="5" style="min-width:800px;
                            border-color:#d8dce5;border-collapse:collapse;
                            font-size:12px;text-align:center" width="100%">`
      // 组装表头数据 ————开始
      let tdHeads = `<th colspan="1" rowspan="2" style="background:#F5F7F9">${opt.yAxis[0].data}</th>`
      let tdSecondHeads = ``
      axisData.forEach(function (item) {
        tdHeads += `<th colspan="4" style="background:#F5F7F9">${item}</th>`
        tdSecondHeads += `<th style="background:#F5F7F9">完成</th>
                            <th style="background:#F5F7F9">进行</th>
                            <th style="background:#F5F7F9">异常</th>
                            <th style="background:#F5F7F9">总计</th>`
      })
      tdHeads +=
        `<th colspan="1" rowspan="2" style="padding:15px 10px;background:#F5F7F9">总计</th>` +
        `<th colspan="1" rowspan="2" style="padding:15px 10px;background:#F5F7F9">入库完成量</th>`

      // 组装表头数据 ————结束

      // 合并table与表头
      table += `<thead><tr>${tdHeads}</tr><tr>${tdSecondHeads}</tr></thead><tbody>`

      // 组装表数据
      let tdBodys = ''
      console.log(listMap)
      // 获取表数据
      for (let i = 0, l = listMap.length; i < l; i++) {
        tdBodys = `<tr ><td style="padding:15px 20px">${listMap[i].typeName}</td>`
        let total = 0
        for (let type of types) {
          let typeTotal = 0
          for (let key of Object.keys(listMap[i])) {
            if (key.lastIndexOf(type) > 0) {
              typeTotal += listMap[i][key]
            }
          }
          total += typeTotal
          tdBodys =
            tdBodys +
            `<td>${listMap[i]['finish' + type]}</td>
              <td>${listMap[i]['processing' + type]}</td>
              <td>${listMap[i]['error' + type]}</td>
              <td style="color:red">
                ${typeTotal}
              </td>`
        }
        let finishTotal = 0
        for (let key of Object.keys(listMap[i])) {
          if (key.startsWith('finish')) {
            finishTotal += listMap[i][key]
          }
        }

        // 合并表数据
        table += tdBodys + `<td>${total}</td>` + `<td>${finishTotal}</td></tr>`
        tdBodys = ''
      }
      table += '</tbody></table>'
      return table
    },
  },
}
</script>

