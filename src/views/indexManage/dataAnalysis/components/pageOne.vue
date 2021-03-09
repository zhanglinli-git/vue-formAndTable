<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:26:44
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-09 10:01:09
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix container-page-title">
      <div class="dataBasic-header">
        <p class="dataBasic-header-title">基本数据</p>
        <p class="dataBasic-header-titleSub">{{ textTitle.join(" / ").toString() }} 5个维度进行统计和展示</p>
      </div>
    </div>

    <div class="container-page-main">
      <el-row v-loading="loading" type="flex" justify="space-between">
        <template v-for="index in data.length">
          <el-col :key="index" :span="4">
            <div class="item">
              <el-row class="item-top" :style="{'background':bgColor[index-1]}">
                <el-col :span="14" style="font-size:16px">
                  <count-to
                    :start-val="0"
                    :end-val="parseFloat(data[index-1].total)"
                    :duration="3000"
                  />
                </el-col>
                <el-col :span="10">
                  <span>
                    日比
                    <template v-if="data[index-1].dayRangeRingRatio >= 0">
                      <span style="color:red">
                        <i class="el-icon-caret-top" />
                        {{ data[index-1].dayRangeRingRatio }}
                      </span>
                    </template>
                    <template v-else>
                      <span style="color:color:rgb(0, 255, 65)">
                        <i class="el-icon-caret-bottom" />
                        {{ data[index-1].dayRangeRingRatio.toString().replace(/\-/g,'') }}
                      </span>
                    </template>
                  </span>
                  <br />
                  <br />
                  <span>
                    周比
                    <template v-if="data[index-1].weekRangeRingRatio >= 0">
                      <span style="color:red">
                        <i class="el-icon-caret-top" />
                        {{ data[index-1].weekRangeRingRatio }}
                      </span>
                    </template>
                    <template v-else>
                      <span style="color:rgb(0, 255, 65)">
                        <i class="el-icon-caret-bottom" />
                        {{ data[index-1].weekRangeRingRatio.toString().replace(/\-/g,'') }}
                      </span>
                    </template>
                  </span>
                </el-col>
              </el-row>
              <el-row
                class="item-bottom"
                :style="{'background':bgColor[index-1]}"
                type="flex"
                justify="space-between"
              >
                <el-col :span="12">
                  <router-link to="/accountSetting/updatePassword">查看更多 >></router-link>
                </el-col>
                <el-col :span="3">
                  <router-link to="/accountSetting/updatePassword">
                    <i class="el-icon-s-promotion" style="font-size:16px" />
                  </router-link>
                </el-col>
              </el-row>
            </div>
            <div style="color:grey;font-size:14px;padding:5px 0px 0px 10px">{{ data[index-1].name }}</div>
          </el-col>
        </template>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { base } from '@/api/dataAnalysis'
import CountTo from 'vue-count-to'

export default {
  name: 'PageOne',
  components: { CountTo },
  data() {
    return {
      bgColor: [
        'rgb(50, 197, 210)',
        'rgb(13, 106, 170)',
        'rgb(242, 159, 165)',
        'rgb(142, 68, 173)',
        'rgb(41, 145, 216)',
      ],
      textTitle: ['总体单量', '电子保单', '纸质保单', '电子信函', '纸质信函'],
      data: [],
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },

  created() {
    this.textTitle.forEach((t) => {
      this.data.push({
        name: t,
        total: 0,
        dayRangeRingRatio: 0,
        weekRangeRingRatio: 0,
      })
    })
    setTimeout(this.base(), 100)
  },

  methods: {
    base() {
      this.loading = true
      base()
        .then((res) => {
          this.loading = false
          this.data = res.data.data
        })
        .catch((e) => {
          this.textTitle.forEach((t) => {
            this.data.push({
              name: t,
              total: 0,
              dayRangeRingRatio: 0,
              weekRangeRingRatio: 0,
            })
          })
          this.loading = false
        })
    },
  },
}
</script>

<style scoped>
.item {
  height: 100px !important ;
  min-width: 190px;
  font-size: 12px !important;
  color: rgb(248, 244, 244);
}
.item-top {
  height: 70%;
  padding: 10px;
  display: flex;
  border-radius: 6px 6px 0px 0px !important;
  align-items: center;
  text-align: center;
}
.item-bottom {
  height: 30%;
  border-radius: 0px 0px 6px 6px !important;
  filter: brightness(0.8);
  display: flex;
  padding-left: 10px;

  align-items: center;
}
p {
  margin: 5px 0;
}

.dataBasic-header {
  border-left: 5px solid rgb(41, 198, 243);
  padding: 0px 15px;
}
.dataBasic-header-title {
  color: rgb(41, 198, 243);
  font-weight: bold;
}
.dataBasic-header-titleSub {
  font-size: 12px;
  color: grey;
}
</style>
