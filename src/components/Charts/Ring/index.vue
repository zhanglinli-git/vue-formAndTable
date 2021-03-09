<template>
  <div :id="'ring-main' + keyValue" class="Echarts" :style="`width:${width}%;height:${height}px`" />
</template>

<script>
import { getNewOptions } from '../extend'

const Echarts = require('echarts/lib/echarts')

export default {
  name: 'Ring',
  props: {
    /**
     * data包含属性
     * 1.extend 可覆盖原echarts配置
     * 2.legedData 显示的图例信息
     * 3.series 可视化图数据
     */
    data: { type: Object, default: () => {} },
    keyValue: [Number, String],
    width: { type: Number, default: 90 },
    height: { type: Number, default: 200 },
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
        document.getElementById('ring-main' + this.keyValue)
      )
      const {
        data: { centerTitle, series, extend, legendData },
      } = this
      const total = series.reduce((acc, cur) => {
        return acc + cur.value
      }, 0)
      const optionData = series
      const option = {
        title: {
          left: '19%',
          top: '37%',
          textAlign: 'center',
          itemGap: 2,
          text: parseFloat(total).toLocaleString(),
          textStyle: {
            color: '#2D8CF0',
            fontSize: 25,
            fontWeight: 'bolder',
          },
          subtext: centerTitle,
          subtextStyle: {
            fontSize: 13,
          },
        },
        legend: {
          orient: 'vertical',
          right: '0%',
          top: 'center',
          itemWidth: 20,
          itemGap: 20,
          data: legendData,
          formatter(name) {
            for (var i = 0, l = optionData.length; i < l; i++) {
              if (optionData[i].name === name) {
                const label = optionData[i].name
                const value = parseFloat(optionData[i].value).toLocaleString()
                return `{a| ${label}}{b${i < 4 ? i : 3}| ${value}}`
              }
            }
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 16,
                color: '#515A6E',
              },
              b0: {
                color: '#36CFC9',
                fontSize: 20,
              },
              b1: {
                color: '#FFD666',
                fontSize: 20,
              },
              b2: {
                color: '#2D8CF0',
                fontSize: 20,
              },
              b3: {
                color: '#9254DE',
                fontSize: 20,
              },
            },
          },
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
        color: ['#5CDBD3', '#FFD666', '#2D8CF0'],
        series: [
          {
            type: 'pie',
            radius: ['80%', '65%'],
            center: ['20%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{b}  {d}%',
                show: false,
              },
            },
            data: series,
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

