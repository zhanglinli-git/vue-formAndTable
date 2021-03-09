<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2020-10-22 14:18:11
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-02-18 11:31:07
-->
<template>
  <div
    :id="'radar-main' + keyValue"
    class="Echarts"
    style="
        width:90%;
        height:300px;
      "
  />
</template>

<script>
// import { getNewOptions } from '../extend'

const Echarts = require('echarts/lib/echarts')

export default {
  name: 'Radar',
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
        document.getElementById('radar-main' + this.keyValue)
      )
      const {
        data: { series: preSeries, legendData, indicator },
      } = this
      let option = (option = {
        color: ['rgb(50, 197, 210)', '#69C0FF'],
        tooltip: {
          trigger: 'item',
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
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            let x = 0 // x坐标位置
            let y = 0 // y坐标位置

            // 当前鼠标位置
            const pointX = point[0]
            const pointY = point[1]

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            const boxWidth = size.contentSize[0]
            const boxHeight = size.contentSize[1]

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5
            } else {
              // 左边放的下
              x = pointX - boxWidth
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5
            } else {
              // 上边放得下
              y = pointY - boxHeight
            }

            return [x, y]
          },
        },
        legend: {
          orient: 'vertical',
          right: '0%',
          top: 'center',
          itemWidth: 20,
          itemGap: 20,
          data: legendData,
        },
        radar: {
          // shape: 'circle',
          splitNumber: 3, // 雷达图圈数设置
          name: {
            textStyle: {
              color: 'grey',
            },
          },
          center: ['50%', '50%'], // 位置
          radius: 80,
          indicator: indicator,
          splitArea: {
            show: false,
            areaStyle: {
              color: 'rgba(255,0,0,0)', // 图表背景的颜色
            },
          },
        },
        series: [
          {
            name: '雷达图', // tooltip中的标题
            type: 'radar', // 表示是雷达图
            areaStyle: {},
            data: preSeries,
          },
        ],
      })
      // if (extend) {
      //   const options = getNewOptions(option, extend)
      //   // 使用刚指定的配置项和数据显示图表。
      //   myChart.setOption(options)
      // } else {
      myChart.setOption(option)
    },
  },
}
</script>

<style>
</style>
