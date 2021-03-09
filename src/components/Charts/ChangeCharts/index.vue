
<template>
  <div class="Echarts" style="position: relative;height: 320px;">
    <div
      :id="'histogram-main'+keyValue"
      style="width:95%;height: 320px;position: absolute;left: 40px;"
    />
  </div>
</template>

<script>

import { getNewOptions } from '../extend'
import { mapGetters } from 'vuex'
import '@/components/Charts/theme/walden'
const Echarts = require('echarts/lib/echarts')

export default {
  name: 'ChangeCharts',
  props: {
    /**
     * data包含属性
     * 1.extend 可覆盖原echarts配置
     * 2.legedData 显示的图例信息
     * 3.xData 显示柱形图的横坐标信息
     * 4.xNAme 显示柱形图的横坐标名称
     * 5.series 可视化图数据
     *   ---->  堆栈柱形图：数组内对象增加属性stack,
     *   ---->  普通柱形图：数组内对象无属性stack,
     */
    data: { type: Object, default: () => {} },
    keyValue: { type: String, default: () => '' },
  },
  computed: {
    ...mapGetters(['theme']),
  },
  watch: {
    data: {
      deep: true,
      immediate: false,
      handler(value) {
        this.myEcharts()
      },
    },
  },
  mounted() {
    this.myEcharts()
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = Echarts.init(
        document.getElementById('histogram-main' + this.keyValue),
        'walden'
      )
      const {
        data: { series: preSeries, legendData, xData, xName, extend },
      } = this

      const series = []
      preSeries?.forEach((item) => {
        series.push({
          name: item.name,
          type: 'bar',
          stack: item.stack ? item.stack : '',
          smooth: true,
          barCategoryGap: '45%',
          label: {
            normal: {
              show: false,
              position: 'insideTop',
              formatter: function (v) {
                return item.formatter ? item.formatter(v.value) : v.value || ''
              },
            },
          },
          data: item.data,
        })
      })

      // 配置工具栏
      const toolbox = {
        right: 150,
        padding: [10, 20],
        show: true,
        feature: {
          dataZoom: { yAxisIndex: 'none' },
          dataView: {
            top: '5%',
            show: true,
            readOnly: true,
            lang: ['', '关闭'],
            optionToContent: function (opt) {
              let tdHeads = `<th style="padding: 0 10px;background:#F5F7F9">${opt.yAxis[0].data}</th>` // 表头
              let tdBodys = '' // 数据
              opt.xAxis[0].data.forEach(function (item) {
                // 组装表头
                tdHeads += `<th style="padding: 15px 20px;background:#F5F7F9">${item}</td>`
              })
              let table = `<table border="2" cellspacing="0" cellpadding="5" style="min-width:800px;
                            border-color:#d8dce5;border-collapse:collapse;
                            font-size:12px;text-align:center" width="100%"><tbody><tr>${tdHeads} </tr>`

              for (let i = 0, l = series.length; i < l; i++) {
                for (let j = 0; j < series[i].data.length; j++) {
                  // 组装表数据
                  tdBodys += `<td>${series[i].data[j]}</td>`
                }
                table += `<tr><td style="padding: 15px 20px">${series[i].name}</td>${tdBodys}</tr>`
                tdBodys = ''
              }
              table += '</tbody></table>'
              return table
            },
          },
          magicType: { type: ['stack', 'tiled'] },
          myTool1: {
            show: true,
            title: '切换面积折线图',
            icon:
              'path://M732.16 97.28c-130.56 0-166.4 261.12-256 261.12S367.616 296.96 250.88 296.96c-130.56 0-138.24 102.4-138.24 102.4v307.2h808.96V322.56s-58.88-225.28-189.44-225.28z M742.4 378.88c-130.56 0-171.52 122.88-261.12 122.88S303.616 343.04 204.8 343.04c-65.024 0-92.16 56.32-92.16 56.32v307.2h808.96V465.92s-48.64-87.04-179.2-87.04z M73.216 828.416h870.4v58.88h-870.4z',
            onclick: (e) => {
              const oldOptions = myChart.getOption()
              const newOptions = this.changCharts(
                'areaLine',
                series,
                oldOptions
              )
              myChart.clear()
              myChart.setOption(newOptions)
            },
          },
          myTool2: {
            show: true,
            title: '切换折线图',
            icon:
              'path://M64.55296 608.95232l209.97632-209.97632 39.82336 39.82336-209.97632 209.97632z M62.976 386.56l196.58752-196.5824 39.82336 39.82336-196.58752 196.5824z M710.02624 562.75456l174.13632-174.13632 39.82336 39.82336-174.13632 174.14144z M694.3744 353.87904l209.98144-209.98144 39.82336 39.82336-209.98144 209.98144z M257.46944 451.1744l16.52736-53.8368 492.9024 151.3216-16.53248 53.84192z M242.80064 244.39296l16.52736-53.84192 492.9024 151.32672-16.5376 53.84192z M73.216 828.416h870.4v58.88h-870.4z ',
            onclick: (e) => {
              const oldOptions = myChart.getOption()
              const newOptions = this.changCharts('line', series, oldOptions)
              myChart.clear()
              myChart.setOption(newOptions)
            },
          },
          myTool3: {
            show: true,
            title: '切换堆栈柱形图',
            icon:
              'path://M547.84 128h235.52v619.52h-235.52zM256 419.84h235.52v327.68H256z M547.84 353.28h235.52v394.24h-235.52zM256 552.96h235.52v199.68H256z M547.84 128h235.52v619.52h-235.52zM256 419.84h235.52v327.68H256z M547.84 353.28h235.52v394.24h-235.52zM256 552.96h235.52v199.68H256z M73.216 828.416h870.4v58.88h-870.4z',
            onclick: (e) => {
              const oldOptions = myChart.getOption()
              const newOptions = this.changCharts('bar', series, oldOptions)
              myChart.clear()
              myChart.setOption(newOptions)
            },
          },
          myTool4: {
            show: true,
            title: '切换漏斗图',
            icon:
              'path://M128 317.013333h754.346667L954.666667 192a38.826667 38.826667 0 0 0-33.706667-58.24h-832A38.826667 38.826667 0 0 0 55.68 192z M720 597.973333l128.426667-222.293333H161.92l128.426667 222.293333h429.653333z M324.266667 656.64l147.2 256a38.826667 38.826667 0 0 0 67.413333 0l147.413333-256z',
            onclick: (e) => {
              const oldOptions = myChart.getOption()
              const newOptions = this.changeFunnel(xData, series, oldOptions)
              myChart.clear()
              myChart.setOption(newOptions)
            },
          },
          myTool5: {
            show: true,
            title: '切换玫瑰图',
            icon:
              'path://M578.52 480.17H821V470a264.79 264.79 0 0 0-71.15-181.32L847.56 191l-7.19-7.19C763.86 107.41 662.15 65.31 554 65.31h-10.18v67.15a335.52 335.52 0 0 0-221.52 91.69l-99.77-99.69a10.17 10.17 0 0 0-14.37 0C115.8 216.76 64.93 339.48 64.93 470a10.16 10.16 0 0 0 10.16 10.16h74c2.55 104.3 44.41 202 118.5 276l7.18 7.18 47.52-47.48a335.53 335.53 0 0 0 221.52 91.68v151.15H554c130.63 0 253.43-50.83 345.81-143.13l7.19-7.18z m221.91-20.32h-221.9l43-42.94 113.91-113.85a244.39 244.39 0 0 1 65 156.79zM564.14 85.76a382 382 0 0 1 254.57 105.36L564.14 445.49V85.76z m-20.32 67v292.73L379.56 281.36l-42.89-42.86a315.34 315.34 0 0 1 207.15-85.72z m-328.39-6.69l92.38 92.31L501.58 432l27.85 27.83H85.36a464.73 464.73 0 0 1 130.07-313.75z m-46 334.09h360l-45.55 45.51L307.8 701.62l-32.93 32.91a381.38 381.38 0 0 1-105.45-254.36z m167.24 221.36l207.15-207v292.72a315.34 315.34 0 0 1-207.15-85.72z m227.47 236.74V494.53l314 313.77a465.48 465.48 0 0 1-314 129.96z M552.66 471.45l182.92 180 50.19 50.15 47.4 47.4c71.45-71.4 115.74-168.59 115.74-277.54z M833.18 759.15a10.13 10.13 0 0 1-7.18-3l-97.6-97.49-182.87-180a10.16 10.16 0 0 1 7.12-17.4h396.26a10.16 10.16 0 0 1 10.16 10.16c0 107.12-42.16 208.24-118.71 284.73a10.13 10.13 0 0 1-7.18 3zM577.47 481.61l165.24 162.62 90.38 90.31c65.85-69.25 103-158.36 105.53-252.93z',
            onclick: (e) => {
              const oldOptions = myChart.getOption()
              const newOptions = this.changePie(xData, series, oldOptions)
              myChart.clear()
              myChart.setOption(newOptions)
            },
          },
          // restore: {},
          saveAsImage: {},
        },
      }
      // 指定图表的配置项和数据
      let option = (option = {
        tooltip: tooltip,
        legend: {
          data: legendData,
          orient: 'vertical',
          right: '0%',
          top: '10%',
          type: 'scroll',
          bottom: 10,
        },
        toolbox: toolbox,
        grid: grid,
        xAxis: {
          ...xAxis,
          axisLabel: {
            interval: 0,
          },
          data: xData,
        },
        yAxis: { ...yAxis, data: xName },
        color: [
          '#2D8CF0',
          '#FFD666',
          '#5CDBD3',
          '#63b2ee',
          '#76da91',
          '#f8cb7f',
          '#f89588',
          '#7cd6cf',
          '#95a2ff',
          '#96d7f9',
          '#f9e264',
          '#f47a75',
          '#9987ce',
        ],
        series: series,
      })

      if (extend) {
        const options = getNewOptions(option, extend)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(options)
        setTimeout(function () {
          window.onresize = function () {
            myChart.resize()
          }
        }, 200)
      } else {
        myChart.setOption(option)
        setTimeout(function () {
          window.onresize = function () {
            myChart.resize()
          }
        }, 200)
      }
    },
    changeFunnel(xData, series, oldOptions) {
      const newOptions = oldOptions
      newOptions.tooltip[0].formatter = function (params) {
        const res =
          '<p>' +
          params.marker +
          params.name +
          ':  ' +
          params.value +
          '  ' +
          params.percent +
          '%</p>'
        return res
      }
      newOptions.tooltip[0].trigger = 'item'
      const ringData = []
      for (let i = 0; i < xData.length; i++) {
        let sum = 0
        for (let j = 0; j < series.length; j++) {
          sum = sum + series[j].data[i]
        }
        ringData.push({ value: sum, name: xData[i] })
      }

      newOptions.series = [
        {
          name: '漏斗图',
          type: 'funnel',
          left: '20%',
          top: 100,
          bottom: 60,
          width: '60%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid',
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: ringData,
        },
      ]
      newOptions.xAxis[0].show = false
      newOptions.yAxis[0].show = false
      return newOptions
    },
    changePie(xData, series, oldOptions) {
      const newOptions = oldOptions
      newOptions.tooltip[0].formatter = function (params) {
        const res =
          '<p>' +
          params.marker +
          params.name +
          ':  ' +
          params.value +
          '  ' +
          params.percent +
          '%</p>'
        return res
      }
      newOptions.tooltip[0].trigger = 'item'
      const ringData = []
      for (let i = 0; i < xData.length; i++) {
        let sum = 0
        for (let j = 0; j < series.length; j++) {
          sum = sum + series[j].data[i]
        }
        ringData.push({ value: sum, name: xData[i] })
      }

      newOptions.series = [
        {
          type: 'pie',
          roseType: 'radius',
          radius: '45%',
          center: ['50%', '50%'],
          label: {
            normal: {
              formatter: '{b}  {d}%',
            },
          },
          data: ringData,
        },
      ]
      newOptions.xAxis[0].show = false
      newOptions.yAxis[0].show = false
      return newOptions
    },
    changCharts(type, series, oldOptions) {
      const newOptions = oldOptions
      newOptions.series = series
      newOptions.xAxis[0].show = true
      newOptions.yAxis[0].show = true
      newOptions.series.forEach((item) => {
        item.type = type === 'areaLine' || type === 'line' ? 'line' : 'bar'
        item.areaStyle = type === 'areaLine' ? {} : null
        item.symbolSize = type === 'areaLine' ? 0.5 : null
      })
      newOptions.tooltip[0].formatter = {}
      newOptions.tooltip[0].trigger = 'axis'
      return newOptions
    },
  },
}

// 配置x轴数据
const xAxis = {
  type: 'category',
  show: true,
  splitLine: {
    show: false,
  },
}

// 配置y轴数据
const yAxis = {
  type: 'value',
  show: true,
  max: function (value) {
    if (value.max > 10 && value.max < 99) {
      return 100
    } else if (value.max > 100 && value.max < 999) {
      return 1000
    } else if (value.max > 1000 && value.max < 9999) {
      return 10000
    } else if (value.max < 10) {
      return 50
    } else {
      return value.max * 10
    }
  },
  // min: function (value) {
  //   return (value.min - 10 * value.min).toFixed(0)
  // },
  minInterval: 1,
  splitLine: {
    show: true,
  }, // 设置横线样式
  axisTick: {
    // y轴刻度线
    show: false,
  },
  axisLine: { show: false },
}

// 配置grid
const grid = {
  left: '3%',
  right: '150',
  top: '15%',
  // containLabel: true,
}

// 鼠标移动提示框
const tooltip = {
  trigger: 'axis',
  axisPointer: {
    // 坐标轴指示器，坐标轴触发有效
    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
  },
  backgroundColor: 'rgba(255,255,255,1)', // 通过设置rgba调节背景颜色与透明度
  color: 'grey',
  borderWidth: '1',
  borderColor: 'rgba(236, 234, 234, 0.699)',
  padding: [10, 15],
  textStyle: {
    color: 'grey',
  },
}
</script>

<style>
</style>
