<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-18 13:37:27
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-09-29 17:38:52
-->
<template>
  <div v-loading="loading.sjgyLoading">
    <el-row class="item-title" style="margin-bottom:30px">数据概要</el-row>
    <el-row style="text-align:center;margin-bottom:40px;line-height:28px">
      <el-col :span="6">
        <div>累计处理数据</div>
        <count-to :start-val="0" :end-val="data.total" :duration="3000" />
      </el-col>
      <el-col :span="6">
        <div>纸质保单累计数据</div>
        <count-to :start-val="0" :end-val="data.paperPolicy" :duration="3000" />
      </el-col>
      <el-col :span="6">
        <div>电子保单累计数据</div>
        <count-to :start-val="0" :end-val="data.electronPolicy" :duration="3000" />
      </el-col>
      <el-col :span="6">
        <div>纸质信函累计数据</div>
        <count-to :start-val="0" :end-val="data.paperLetter" :duration="3000" />
      </el-col>
    </el-row>
    <el-row style="text-align:center">
      <el-col :span="6">
        <div>电子信函累计数据</div>
        <count-to :start-val="0" :end-val="data.electronLetter" :duration="3000" />
      </el-col>
      <el-col :span="6">
        <div>近7日异常数据</div>
        <count-to :start-val="0" :end-val="data.dayRangeError" :duration="3000" />
        <div>
          <span style="color: #aaaaaa;font-size: 14px"><b>同比</b> {{ data.dayRangeErrorYoY }} %</span>
          <template v-if="data.dayRangeErrorYoY>=0">
            <i class="el-icon-top" style="color:orange" />
          </template>
          <template v-else>
            <i class="el-icon-bottom" style="color:green" />
          </template>
        </div>
      </el-col>
      <el-col :span="6">
        <div>近7日处理数据</div>
        <count-to :start-val="0" :end-val="data.dayRange" :duration="3000" />
        <div>
          <span style="color: #aaaaaa;font-size: 14px"><b>同比</b> {{ data.dayRangeYoY }} %</span>
          <template v-if="data.dayRangeYoY>=0">
            <i class="el-icon-top" style="color:orange" />
          </template>
          <template v-else>
            <i class="el-icon-bottom"  style="color:green" />
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {summary} from '@/api/platformData'
import { handleAlert } from '@/utils/confirm'
import CountTo from 'vue-count-to'

const DEFAULT_DATA = {
  total: 0,
  paperPolicy:0,
  electronPolicy:0,
  paperLetter:0,
  electronLetter:0,
  dayRangeError:0,
  dayRangeErrorYoY:0,
  dayRange:0,
  dayRangeYoY:0
}

export default {
  components:{CountTo},
  data() {
    return {
      data: DEFAULT_DATA,
      loading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true;
      await summary().then((response) => {
        this.data = response.data.data
      }).catch((error) => {
        this.data = null;
      });
      if(!this.data){
        this.data = DEFAULT_DATA;
        handleAlert('数据概要数据获取失败！', 'error')
      }
      this.loading = false
    },
  },
}
</script>

