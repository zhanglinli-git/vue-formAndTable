<template>
  <div
    :id="'ring2-main' + keyValue"
    class="Echarts"
    :style="`width:${width}%;height:${height}px;`"
  />
</template>

<script>
import { getNewOptions } from '../extend'

const Echarts = require('echarts/lib/echarts')

export default {
  name: 'Ring2',
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
    height: { type: Number, default: 95 },
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
        document.getElementById('ring2-main' + this.keyValue)
      )
      const {
        data: { centerTitle, series, extend, legendData },
      } = this
      const optionData = series
      const hasNumber = optionData[0]?.value
      let totalNumber = '1'
      for (let i = 0; i < hasNumber.toString().length; i++) {
        totalNumber = totalNumber + '0'
      }
      const empty = {
        value: Number(totalNumber) - hasNumber,
      }
      const option = {
        title: {
          left: '50%',
          top: '40%',
          textAlign: 'center',
          itemGap: 10, // 主副标题间距
          // text: `{blue|${parseFloat(hasNumber).toLocaleString()}}/${parseFloat(
          //   totalNumber
          // ).toLocaleString()}`,
          text: `{blue|${parseFloat(hasNumber).toLocaleString()}}`,
          textStyle: {
            fontSize: 18,
            color: '#515A6E',
            rich: {
              blue: {
                fontSize: 18,
                color: '#69C0FF',
              },
            },
          },
          subtext: centerTitle,
          subtextStyle: {
            fontSize: 13,
          },
        },
        legend: {
          show: false,
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
                return `{a| ${label}}{b${i < 2 ? i : 1}| ${value}}`
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
                color: '#69C0FF',
                fontSize: 20,
              },
              b1: {
                color: '#FFF',
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
            if (params.name) {
              const res = `<p>
              ${params.marker}  
              ${params.name}:
              <font style="font-size:14px;margin-left:10px;font-weight:bold;color:${params.color}">
                ${params.value}
              </font><font style="margin-left:10px;">${params.percent}%</font></p>`
              return res
            }
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
        color: ['#69C0FF', '#fff'],
        series: [
          {
            type: 'pie',
            radius: ['90%', '75%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{b}  {d}%',
                show: false,
              },
            },
            data: [...series, empty],
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

