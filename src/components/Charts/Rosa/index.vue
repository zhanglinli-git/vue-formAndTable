<template>
  <div
    :id="'rosa-main' + keyValue"
    class="Echarts"
    style="
        width: 400px;
        height: 300px;
      "
  />
</template>

<script>
import { getNewOptions } from '../extend'
const Echarts = require('echarts/lib/echarts')

export default {
  name: 'Rosa',
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
  mounted() {
    this.myEcharts()
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = Echarts.init(
        document.getElementById('rosa-main' + this.keyValue)
      )
      const {
        data: { series, extend, legendData },
      } = this
      let option = (option = {
        top: 10,
        legend: {
          data: legendData,
          padding: [340, 0, 0, 0],
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
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
        color: [
          'rgb(50, 197, 210)',
          'rgb(13, 106, 170)',
          'rgb(242, 159, 165)',
          'rgb(142, 68, 173)',
          'rgb(41, 145, 216)',
        ],
        series: [
          {
            type: 'pie',
            roseType: 'radius',
            radius: '45%', // 半径
            center: ['50%', '52%'], // 位置
            label: {
              normal: {
                formatter: '{b}  {d}%',
              },
            },
            data: series,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
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
