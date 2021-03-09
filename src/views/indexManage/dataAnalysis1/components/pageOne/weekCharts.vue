<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-01-20 17:32:01
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-09 10:01:34
-->
<template>
  <area-line
    v-if="item&&extend"
    :data="item"
    :key-value="id"
    :extend="extend"
    :width="95"
    :height="70"
  />
</template>

<script>
import { AreaLine } from '@/components'
export default {
  name: 'WeekCharts',
  components: { AreaLine },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    id: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      bgColor: [],
      extend: {
        tooltip: {
          textStyle: {
            fontSize: 6,
          },
          padding: [5, 2],
          position: 'right',
          formatter: (params) => {
            let showHtml = params[0].name
            for (let i = 0; i < params.length; i++) {
              showHtml = `${showHtml}<br/><br/>${params[i].seriesName}   ${params[i].data}`
            }
            return showHtml
          },
        },
        grid: {
          left: '-12px',
          right: 0,
          top: '1px',
          bottom: '-10px',
          containLabel: true,
        },
        xAxis: {
          show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        },
        yAxis: {
          show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
        },
      },
    }
  },
  created() {
    this.bgColor = [
      ['rgba(179, 127, 235,'],
      ['rgba(105, 192, 255,'],
      ['rgba(255, 214, 102,'],
      ['rgba(149, 222, 100,'],
      ['rgba(242, 18, 18,'],
    ]
    this.extend.color = {
      colorStops: [
        {
          offset: 0,
          color: this.bgColor[this.id] + '1)', // 0% 处的颜色
        },
        {
          offset: 0.5,
          color: this.bgColor[this.id] + '0.6)', // 0% 处的颜色
        },
        {
          offset: 1,
          color: this.bgColor[this.id] + '0.1)', // 100% 处的颜色
        },
      ],
    }
  },
}
</script>
