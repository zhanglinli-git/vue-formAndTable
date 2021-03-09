<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-01-21 15:40:54
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-09 16:11:35
-->
<template>
  <div>
    <p class="title">打印点统计</p>
    <el-row v-if="data.length>0" type="flex" justify="space-between">
      <template v-for="(item,index) in data.length">
        <el-col :key="index" :span="6" :style="index !== 0 ? 'margin-left:20px':''" class="top-two">
          <el-card>
            <div class="item">
              <el-row type="flex" justify="space-between" class="header">
                <span class="header-title">{{ data[index].centerName }}</span>
                <i class="el-icon-trophy" :style="{'color':iconColor[index]}" />
                <span class="show-ranking" :style="{'color':iconColor[index]}">{{ index + 1 }}</span>
              </el-row>
            </div>

            <div class="item">
              <count-charts :item="data[index].chartData" />
            </div>

            <div class="item">
              <div class="total">总单量: {{ parseFloat(data[index].total).toLocaleString() }}</div>
            </div>

            <div class="item">
              <el-row>
                <template v-for="o in data[index].type.length">
                  <span
                    :key="o"
                    class="type"
                    :style="`background:${tagColor[o-1]};`"
                  >{{ data[index].type[o-1] }}</span>
                </template>
              </el-row>
            </div>

            <div class="item">
              <el-row type="flex" justify="between" class="address">
                <i class="el-icon-location-outline" style="color:#69C0FF" />
                <span class="city">{{ data[index].city }}</span>
                <span>{{ data[index].address }}</span>
              </el-row>
            </div>

            <div class="item">
              <el-row type="flex" justify="between" class="info">
                <i class="el-icon-phone-outline" style="color:#69C0FF" />
                <span class="user">{{ data[index].user }}</span>
                <span>{{ data[index].phone }}</span>
                <span>{{ data[index].email }}</span>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import CountCharts from './pageTwo/countCharts'
import { getCenterStatistics } from '@/api/dataAnalysis'

export default {
  name: 'PageTwo',
  components: { CountCharts },
  data() {
    return {
      tagColor: ['#409EFF', '#69C0FF', '#B37FEB'],
      iconColor: ['#FF0000', '#FFD666', '#69C0FF', '#95DE64', '#B37FEB'],
      data: [],
    }
  },
  created() {
    this.getInit()
  },
  methods: {
    getInit() {
      getCenterStatistics().then((res) => {
        const {
          data: { data },
        } = res
        data?.forEach((d) => {
          const dataO = {
            centerName: d.centerName,
            city: d.city,
            address: d.address,
            user: d.linkMan,
            total: d.num,
            type: d.type,
            phone: d.phone,
            email: d.email,
          }
          dataO.chartData = {}
          dataO.chartData.centerTitle = '日处理负载'
          dataO.chartData.series = []
          dataO.chartData.series.push({
            value: d.activeNum,
            name: '日处理负载',
          })
          this.data.push(dataO)
        })
      })
    },
  },
}
</script>
<style scoped>
.top-two {
  min-width: 280px;
}
.user,
.city {
  min-width: 40px;
}
.header {
  font-size: 24px;
}
.header-title {
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
}
.title {
  font-size: 19px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: #000000;
  opacity: 1;
}
.el-card {
  border-radius: 10px !important;
}
/* 打印点排位名次 */
.show-ranking {
  position: absolute;
  right: 4px;
  top: 3px;
  font-size: 12px;
}
.type {
  font-size: 12px;
  border-radius: 7px;
  text-align: center;
  margin-right: 5px;
  color: #fff;
  width: 59px;
  height: 24px;
  line-height: 24px;
  display: block;
  float: left;
}
.address,
.info {
  font-size: 12px;
}
.info span,
.address,
span {
  margin-right: 5px;
}
.total {
  text-align: center;
  font-size: 13px;
}
.item {
  margin-bottom: 10px;
}
</style>

