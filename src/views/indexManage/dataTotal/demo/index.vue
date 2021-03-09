<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:07:10
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-10-28 11:23:25
-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="container-page-main">
        <div class="main-item">
          <el-row class="item-title">数据概要</el-row>
          <el-row style="text-align:center;margin-bottom:40px">
            <el-col :span="6">
              <div>累计处理数据</div>
              <div>2,805,763</div>
            </el-col>
            <el-col :span="6">
              <div>纸质保单累计数据</div>
              <div>672</div>
            </el-col>
            <el-col :span="6">
              <div>电子保单累计数据</div>
              <div>1,603</div>
            </el-col>
            <el-col :span="6">
              <div>纸质信函累计数据</div>
              <div>1,603</div>
            </el-col>
          </el-row>
          <el-row style="text-align:center">
            <el-col :span="6">
              <div>电子信函累计数据</div>
              <div>1,603</div>
            </el-col>
            <el-col :span="6">
              <div>近7日异常数据</div>
              <div>33</div>
              <div>同比 0.30% +</div>
            </el-col>
            <el-col :span="6">
              <div>近7日处理数据</div>
              <div>56666</div>
              <div>同比 10.30% +</div>
            </el-col>
          </el-row>
        </div>

        <div class="main-item">
          <el-row class="item-title" type="flex" justify="space-between">
            <div>整体分布</div>
            <div>
              <el-date-picker
                v-model="dateValue"
                size="mini"
                style="width:250px"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeChartData"
              />
            </div>
          </el-row>
        </div>

        <el-row>
          <el-col :span="12">
            <div class="main-item">
              <el-row class="item-title" type="flex" justify="space-between">
                <div>类型比例</div>
                <div>
                  <el-date-picker
                    v-model="dateValue"
                    style="width:250px"
                    size="mini"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </div>
              </el-row>
              <!-- <ve-ring :data="chartFileTypeData"></ve-ring> -->
              <ve-ring :data="chartData" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="main-item">
              <el-row class="item-title" type="flex" justify="space-between">
                <div>材质比例</div>
                <div>
                  <el-date-picker
                    v-model="dateValue"
                    size="mini"
                    style="width:250px"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </div>
              </el-row>
              <ve-ring :data="chartData" />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { isTimes } from '@/utils/public'
import {
  dataTableChange,
  dataChartsChange,
  dataChartsTotal,
  dataFileTypeTotal,
} from './dataChange'

export default {
  data() {
    const data = [
      {
        date: '2020-08-29',
        fileType: [
          {
            fileName: 1,
            processNowBeans: [
              {
                completedNum: 1,
                exceptionNum: 1,
                handlingNum: 1,
                processName: 'DataDownload',
              },
              {
                completedNum: 1,
                exceptionNum: 1,
                handlingNum: 1,
                processName: 'Import',
              },
              {
                completedNum: 1,
                exceptionNum: 1,
                handlingNum: 1,
                processName: 'GeneraPDF',
              },
              {
                completedNum: 1,
                exceptionNum: 1,
                handlingNum: 1,
                processName: 'Distribute',
              },
            ],
          },
          {
            fileName: 2,
            processNowBeans: [
              {
                completedNum: 2,
                exceptionNum: 2,
                handlingNum: 2,
                processName: 'DataDownload',
              },
              {
                completedNum: 2,
                exceptionNum: 2,
                handlingNum: 2,
                processName: 'Import',
              },
              {
                completedNum: 2,
                exceptionNum: 2,
                handlingNum: 2,
                processName: 'GeneraPDF',
              },
              {
                completedNum: 2,
                exceptionNum: 2,
                handlingNum: 2,
                processName: 'Distribute',
              },
            ],
          },
          {
            fileName: 3,
            processNowBeans: [
              {
                completedNum: 13,
                exceptionNum: 13,
                handlingNum: 13,
                processName: 'DataDownload',
              },
              {
                completedNum: 13,
                exceptionNum: 13,
                handlingNum: 13,
                processName: 'Import',
              },
              {
                completedNum: 13,
                exceptionNum: 13,
                handlingNum: 13,
                processName: 'GeneraPDF',
              },
              {
                completedNum: 13,
                exceptionNum: 13,
                handlingNum: 13,
                processName: 'Distribute',
              },
            ],
          },
          {
            fileName: 4,
            processNowBeans: [
              {
                completedNum: 14,
                exceptionNum: 14,
                handlingNum: 14,
                processName: 'DataDownload',
              },
              {
                completedNum: 14,
                exceptionNum: 14,
                handlingNum: 14,
                processName: 'Import',
              },
              {
                completedNum: 15,
                exceptionNum: 15,
                handlingNum: 15,
                processName: 'GeneraPDF',
              },
              {
                completedNum: 16,
                exceptionNum: 16,
                handlingNum: 16,
                processName: 'Distribute',
              },
            ],
          },
        ],
      },

      {
        date: '2020-08-30',
        fileType: [
          {
            fileName: 1,
            processNowBeans: [
              {
                completedNum: 1,
                exceptionNum: 1,
                handlingNum: 1,
                processName: 'DataDownload',
              },
              {
                completedNum: 8,
                exceptionNum: 2,
                handlingNum: 6,
                processName: 'Import',
              },
              {
                completedNum: 5,
                exceptionNum: 2,
                handlingNum: 8,
                processName: 'GeneraPDF',
              },
              {
                completedNum: 1,
                exceptionNum: 1,
                handlingNum: 1,
                processName: 'Distribute',
              },
            ],
          },
          {
            fileName: 2,
            processNowBeans: [
              {
                completedNum: 2,
                exceptionNum: 2,
                handlingNum: 2,
                processName: 'DataDownload',
              },
              {
                completedNum: 3,
                exceptionNum: 3,
                handlingNum: 7,
                processName: 'Import',
              },
              {
                completedNum: 10,
                exceptionNum: 7,
                handlingNum: 9,
                processName: 'GeneraPDF',
              },
              {
                completedNum: 2,
                exceptionNum: 2,
                handlingNum: 2,
                processName: 'Distribute',
              },
            ],
          },
          {
            fileName: 3,
            processNowBeans: [
              {
                completedNum: 3,
                exceptionNum: 3,
                handlingNum: 3,
                processName: 'DataDownload',
              },
              {
                completedNum: 6,
                exceptionNum: 8,
                handlingNum: 5,
                processName: 'Import',
              },
              {
                completedNum: 12,
                exceptionNum: 47,
                handlingNum: 12,
                processName: 'GeneraPDF',
              },
              {
                completedNum: 3,
                exceptionNum: 3,
                handlingNum: 3,
                processName: 'Distribute',
              },
            ],
          },
          {
            fileName: 4,
            processNowBeans: [
              {
                completedNum: 4,
                exceptionNum: 4,
                handlingNum: 4,
                processName: 'DataDownload',
              },
              {
                completedNum: 3,
                exceptionNum: 5,
                handlingNum: 7,
                processName: 'Import',
              },
              {
                completedNum: 4,
                exceptionNum: 4,
                handlingNum: 4,
                processName: 'GeneraPDF',
              },
              {
                completedNum: 4,
                exceptionNum: 4,
                handlingNum: 4,
                processName: 'Distribute',
              },
            ],
          },
        ],
      },
    ]

    this.chartExtend = {
      series: {
        barMaxWidth: 55,
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      tooltip: {
        // 触发类型：坐标轴触发
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,1)', // 通过设置rgba调节背景颜色与透明度
        color: 'grey',
        borderWidth: '1',
        borderColor: 'rgba(236, 234, 234, 0.699)',
        padding: [15, 20],
        textStyle: {
          color: 'grey',
        },
      },
    }

    this.chartSettings = {
      stack: {
        完成: ['电子保单完成', '电子信函完成', '纸质保单完成', '纸质信函完成'],
        进行: ['电子保单进行', '电子信函进行', '纸质保单进行', '纸质信函进行'],
        异常: ['电子保单异常', '电子信函异常', '纸质保单异常', '纸质信函异常'],
      },
      // max: [100, 10],
    }

    return {
      dateValue: '',
      initData: data,
      chartData: {
        columns: [
          '类型',
          '电子保单完成',
          '电子信函完成',
          '纸质保单完成',
          '纸质信函完成',
          '电子保单进行',
          '电子信函进行',
          '纸质保单进行',
          '纸质信函进行',
          '电子保单异常',
          '电子信函异常',
          '纸质保单异常',
          '纸质信函异常',
        ],
        rows: this.currentData(data),
      },
      chartFileTypeData: {
        columns: ['fileName', 'total'],
        rows: this.getFileTypeTotal(data),
      },
    }
  },
  created() {
    this.getTableData(this.initData)
    console.log(dataChartsChange(this.initData[0]))
    console.log(dataFileTypeTotal(this.initData))
  },
  methods: {
    getFileTypeTotal(data) {
      const preData = JSON.parse(JSON.stringify(data))
      return dataFileTypeTotal(preData)
    },

    getTableData(data) {
      const preData = JSON.parse(JSON.stringify(data))
      const newData = []
      preData.forEach((item) => {
        dataTableChange(item).forEach((dItem) => {
          newData.push(dItem)
        })
      })
    },

    currentData(data) {
      const preData = JSON.parse(JSON.stringify(data))
      const newData = []
      preData.forEach((item) => {
        dataChartsChange(item).forEach((dItem) => {
          newData.push(dItem)
        })
      })
      return dataChartsTotal(newData)
    },
    changeChartData(date) {
      const initData = JSON.parse(JSON.stringify(this.initData))
      if (date) {
        const startTime = date[0]
        let endTime = date[1]
        if (startTime && !endTime) {
          endTime = new Date()
        }
        var newData = []
        initData.forEach((item) => {
          if (isTimes(item.date, startTime, endTime) === true) {
            newData.push(item)
          }
        })
        this.chartData.rows = this.currentData(newData)
      } else {
        this.chartData.rows = this.currentData(initData)
      }
    },
  },
}
</script>

<style scoped>
.main-item {
  border: 1px solid rgba(236, 234, 234, 0.699) !important;
  padding: 25px !important;
  margin: 20px !important;
}
.item-title {
  margin-bottom: 30px !important;
  height: 28px !important;
  line-height: 28px !important;
}
</style>
