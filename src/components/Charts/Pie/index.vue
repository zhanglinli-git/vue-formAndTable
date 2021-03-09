<template>
  <div
    :id="'pie-main' + keyValue"
    class="Echarts"
    style="
        width: 90%;
        height: 300px;
      "
  />
</template>

<script>
import { getNewOptions } from '../extend'

const Echarts = require('echarts/lib/echarts')

export default {
  name: 'Pie',
  props: {
    /**
     * data包含属性
     * 1.extend 可覆盖原echarts配置
     * 2.legedData 显示的图例信息
     * 3.series 可视化图数据
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
        document.getElementById('pie-main' + this.keyValue)
      )
      const {
        data: { series, extend, legendData },
      } = this
      const option = {
        backgroundColor: '#fff',
        legend: {
          orient: 'vertical',
          right: '0%',
          top: 'center',
          itemWidth: 20,
          itemGap: 20,
          data: legendData,
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            const res = `<p>
              ${params.marker}  
              ${params.name}:
              <font style="font-size:14px;margin-left:10px;font-weight:bold;color:${params.color}">
                ${params.value}
              </font><font style="margin-left:10px;">${params.percent}%</font></p>`
            return res
          },
          backgroundColor: 'rgba(255,255,255,1)', // 通过设置rgba调节背景颜色与透明度
          color: 'grey',
          borderWidth: '1',
          borderColor: 'rgba(236, 234, 234, 0.699)',
          padding: [0, 20],
          textStyle: {
            color: 'grey',
          },
        },
        color: ['#5CDBD3', '#FFD666', '#2D8CF0', '#69C0FF'],
        series: [
          {
            type: 'pie',
            radius: [0, 80],
            center: ['40%', '50%'],
            label: {
              normal: {
                formatter: '{b}\n{d}%',
                show: true,
              },
            },
            data: series,
            itemStyle: {
              borderWidth: 2, // 设置border的宽度有多大
              borderColor: '#fff',
            },
          },
        ],
      }

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
  },
}
</script>

