<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:32:29
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-21 16:15:28
-->
<template>
  <div style="margin-top:30px">
    <el-row type="flex" justify="space-between">
      <el-col :span="20">
        <div class="item-title">流程时效统计</div>
      </el-col>
      <el-col :span="4">
        <el-date-picker v-model="dateValue" size="mini" style="width: 140px" type="date" />
      </el-col>
    </el-row>
    <area-line v-if="data" :data="data" key-value="1" :extend="data.extend" :width="100" />
  </div>
</template>

<script>
import { AreaLine } from '@/components'

export default {
  components: { AreaLine },
  data() {
    return {
      dateValue: new Date(),
      data: {
        extend: {
          tooltip: {
            formatter: (params) => {
              let showHtml = params[0].name
              for (let i = 0; i < params.length; i++) {
                showHtml =
                  showHtml +
                  '<br/> ' +
                  `${params[i].marker}${params[i].seriesName}   ${params[i].data}s`
              }
              return showHtml
            },
          },
          color: [
            '#dec321',
            'rgb(50, 197, 210)',
            'rgb(13, 106, 170)',
            'rgb(242, 159, 165)',
            'rgb(142, 68, 173)',
            'rgb(41, 145, 216)',
          ],
        },
        xData: [
          '09 28',
          '09 29',
          '09 30',
          '10 01',
          '10 02',
          '10 03',
          '10 04',
          '10 05',
          '10 06',
          '10 07',
          '10 08',
          '10 09',
          '10 10',
          '10 11',
        ],
        xName: '进程类型',
        series: [
          {
            name: '数据处理用时',
            type: 'line',
            data: [2, 5, 6, 3, 4, 2, 3, 2, 5, 2, 1, 5, 6, 3],
            // formatter: (value) => { return value+'千元'}
          },
          {
            name: 'pdf生成用时',
            type: 'line',
            data: [2, 5, 5, 3, 4, 2, 3, 4, 5, 2, 7, 5, 6, 3],
          },
          {
            name: '数据分发用时',
            type: 'line',
            data: [2, 5, 3, 8, 4, 2, 6, 4, 5, 2, 1, 5, 6, 3],
          },
          {
            name: '邮件发送用时',
            type: 'line',
            data: [2, 5, 3, 3, 4, 9, 3, 4, 5, 2, 1, 5, 6, 3],
          },
          {
            name: '数据打印用时',
            type: 'line',
            data: [2, 5, 1, 3, 4, 2, 3, 4, 2, 2, 1, 5, 6, 3],
          },
        ],
      },
    }
  },
}
</script>

<style scoped>
.item-title {
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  /* color: rgb(0, 132, 255); */
}
</style>
