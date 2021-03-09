<template>
  <div :id="'CrossHistogram' + keyValue" class="Echarts" style="height: 160px;width: 400px;" />
</template>

<script>
import { getNewOptions } from '../extend'
import '@/components/Charts/theme/walden'
const Echarts = require('echarts/lib/echarts')

export default {
  name: 'CrossHistogram',
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
        document.getElementById('CrossHistogram' + this.keyValue),
        'walden'
      )
      const {
        data: { series: preSeries, legendData, yData, extend },
      } = this

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
          textStyle: {
            color: 'grey',
          },
        },
        legend: {
          data: legendData,
          top: '3%',
          left: '14%',
        },
        grid: {
          top: '0%',
          left: '-20%',
          right: '0%',
          bottom: '0%',
          containLabel: true,
        },
        yAxis: {
          type: 'category',
          data: yData,
          axisLine: {
            // y轴
            show: false,
          },
          axisTick: {
            // y轴刻度线
            show: false,
          },
          splitLine: {
            // 网格线
            show: false,
          },
          axisLabel: {
            interval: 0,
            margin: 120,
            textStyle: {
              align: 'left',
            },
          },
        },
        xAxis: {
          type: 'value',
          show: false,
          minInterval: 1,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: preSeries,
            type: 'bar',
            itemStyle: {
              normal: {
                color: (params) => {
                  const colorList = ['#86b3fe', '#5D77FF', '#6DD48B', '#9e70f3']
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  formatter: '{c}',
                  color: '#fff',
                },
              },
            },
            // 设置柱的宽度，要是数据太少，柱子太宽不美观~
            barWidth: 20,
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

