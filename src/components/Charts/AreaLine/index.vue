
<template>
  <div class="Echarts" style="position: relative;" :style="`height:${height}px`">
    <div :id="'areaLine-main'+keyValue" :style="`width:${width}%;height:${height}px`" />
  </div>
</template>

<script>
import { getNewOptions } from '../extend'
import '@/components/Charts/theme/walden'
const Echarts = require('echarts/lib/echarts')

export default {
  name: 'AreaLine',
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
    extend: { type: Object, default: () => {} },
    keyValue: [Number, String],
    width: { type: Number, default: 95 },
    height: { type: Number, default: 250 },
  },
  mounted() {
    this.myEcharts()
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
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = Echarts.init(
        document.getElementById('areaLine-main' + this.keyValue),
        'walden'
      )
      const {
        data: { series: preSeries, legendData, xData, xName },
        extend,
      } = this
      const series = []

      preSeries?.forEach((item) => {
        series.push({
          name: item.name,
          type: item.type ? item.type : 'line',
          smooth: true,
          areaStyle: {},
          symbolSize: 0.5,
          label: {
            normal: {
              show: false,
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
        tooltip: tooltip,
        legend: { data: legendData, padding: [285, 0, 0, 0] },
        grid: grid,
        xAxis: { ...xAxis, data: xData },
        yAxis: { ...yAxis, data: xName },
        series: series,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(55, 242, 255, 0.5)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(55, 242, 255, 0)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
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

// 配置x轴数据
const xAxis = {
  type: 'category',
  show: true,
  // boundaryGap值为false的时候，折线第一个点在y轴上
  boundaryGap: false,
}

// 配置y轴数据
const yAxis = {
  type: 'value',
  show: true,
  // max: function (value) {
  //   return ((value.max + 2 * value.min) / 10).toFixed(0) * 10
  // },
  // min: function (value) {
  //   return ((value.min - 1 * value.min) / 10).toFixed(0) * 10
  // },
  // minInterval: 1,
  splitLine: {
    show: true,
  },
  axisTick: {
    // y轴刻度线
    show: false,
  },
}

// 配置grid
const grid = {
  left: '3%',
  right: '4%',
  top: '18%',
  bottom: '35%',
  containLabel: true,
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
  position: function (point, params, dom, rect, size) {
    // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
    // 提示框位置
    let x = 0 // x坐标位置
    let y = 0 // y坐标位置

    // 当前鼠标位置
    let pointX = point[0]
    let pointY = point[1]

    // 外层div大小
    // var viewWidth = size.viewSize[0];
    // var viewHeight = size.viewSize[1];

    // 提示框大小
    let boxWidth = size.contentSize[0]
    let boxHeight = size.contentSize[1]

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
}
</script>
