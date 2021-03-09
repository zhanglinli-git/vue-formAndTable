<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-24 09:33:52
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-02-18 11:10:44
-->

<template>
  <div class="Echarts">
    <div :id="'histogram-main'+keyValue" style="width:90%; height: 400px; padding: 20px 0px" />
  </div>
</template>

<script>
import { getNewOptions } from '../extend'
import '@/components/Charts/theme/walden'
const Echarts = require('echarts/lib/echarts')

export default {
  name: 'Histogram',
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
          type: item.type,
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

      // 指定图表的配置项和数据
      let option = (option = {
        tooltip: {
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
        },
        legend: {
          data: legendData,
          top: '3%',
          left: '14%',
        },
        toolbox: {
          right: 20,
          top: 40,
          padding: [10, 20],
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: {
              top: '5%',
              readOnly: false,
              optionToContent: function (opt) {
                const axisData = opt.xAxis[0].data // 坐标数据
                const series = opt.series // 折线图数据
                let tdHeads = `<td  style="padding: 0 10px;background:rgba(133, 139, 137, 0.44)">${opt.yAxis[0].data}</td>` // 表头
                let tdBodys = '' // 数据
                series.forEach(function (item) {
                  // 组装表头
                  tdHeads += `<td style="padding: 5px 25px;background:rgba(133, 139, 137, 0.44)">${item.name}</td>`
                })
                let table = `<table border="1" style="margin-left:20px;border-color:rgba(133, 139, 137, 0.44);border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`
                for (let i = 0, l = axisData.length; i < l; i++) {
                  for (let j = 0; j < series.length; j++) {
                    // 组装表数据
                    tdBodys += `<td>${series[j].data[i]}</td>`
                  }
                  table += `<tr><td style="padding: 10px 25px">${axisData[i]}</td>${tdBodys}</tr>`
                  tdBodys = ''
                }
                table += '</tbody></table>'
                return table
              },
            },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        grid: {
          left: '10%',
          right: '4%',
          top: '23%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xData,
        },
        yAxis: {
          type: 'value',
          data: xName,
          max: function (value) {
            return ((value.max + 2 * value.min) / 100).toFixed(0) * 100
          },
          min: function (value) {
            return ((value.min - 1 * value.min) / 100).toFixed(0) * 100
          },
          minInterval: 1,
          splitLine: {
            show: true,
          },
          axisTick: {
            // y轴刻度线
            show: false,
          },
        },
        series: series,
      })

      if (extend) {
        const options = getNewOptions(option, extend)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(options)
      } else {
        myChart.setOption(option)
      }
    },
  },
}
</script>

<style>
</style>
