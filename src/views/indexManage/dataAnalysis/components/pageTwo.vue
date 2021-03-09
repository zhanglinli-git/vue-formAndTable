<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:31:54
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-11-03 11:45:32
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix container-page-title">
      <el-row>
        <el-col :span="22">
          <div class="dataPrinted-header">
            <p class="dataPrinted-header-title">打印点统计</p>
            <p class="dataPrinted-header-titleSub">根据所属打印点打印数量进行统计展示</p>
          </div>
        </el-col>
        <el-col :span="2">
          <p>
            <router-link to="/accountSetting/updatePassword" class="dataPrinted-header-more">查看更多 >></router-link>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="container-page-main" style="margin-bottom:20px">
      <el-row type="flex" justify="space-between">
        <template v-for="index in 4">
          <el-col :key="index" :span="6" style="margin-right:10px">
            <div class="dataPrinted-main">
              <el-card class="box-card">
                <el-row class="dataPrinted-main-item">
                  <el-col :span="12" class="left">
                    <div class="show-city">{{ data[index-1].city }}</div>
                  </el-col>
                  <el-col :span="12" class="right">
                    <i v-if="index === 1" class="el-icon-medal-1 show-win" />
                    <i
                      class="el-icon-s-flag"
                      style="font-size:24px"
                      :style="{'color':tagColor[index-1]}"
                    />
                    <span class="show-ranking">{{ index }}</span>
                  </el-col>
                </el-row>
                <el-row class="dataPrinted-main-item">
                  <el-col :span="10">实达花桥打印点</el-col>
                  <el-col :span="15" style="text-align:right">
                    <span style="color:rgb(50, 197, 210)">
                      {{ addChinese(data[index-1].number) }}
                      <span>(活跃)</span>
                    </span>/
                    <span>10万</span>(基数)
                  </el-col>
                </el-row>
                <el-row class="dataPrinted-main-item">
                  <el-col :span="16">
                    <template v-for="o in data[index-1].type.length">
                      <span
                        :key="o"
                        style="padding:1px 5px;font-size:12px;background:grey;border-radius:10px;text-align:center;margin-right:5px;color:#fff"
                        p
                      >{{ data[index-1].type[o-1] }}</span>
                    </template>
                  </el-col>
                  <el-col :span="9" style="text-align:right">负责人:{{ data[index-1].user }}</el-col>
                </el-row>
                <div style="border-top:1px solid #e4e7ed;margin: 5px -20px;" />
                <el-row>总单量:{{ data[index-1].total }}万单</el-row>
              </el-card>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { addChineseUnit } from '@/utils/numberUnit'

export default {
  data() {
    return {
      tagColor: [
        'rgb(50, 197, 210)',
        'rgb(13, 106, 170)',
        'rgb(242, 159, 165)',
        'rgb(142, 68, 173)',
        'rgb(41, 145, 216)',
      ],
      data: [
        {
          city: '江苏省苏州市',
          number: 61000,
          type: ['保单', '信函', '个性化'],
          user: '林情情',
          total: 128,
        },
        {
          city: '江苏省苏州市',
          number: 81000,
          type: ['保单', '信函', '个性化'],
          user: '林情情',
          total: 128,
        },
        {
          city: '江苏省苏州市',
          number: 71000,
          type: ['保单', '信函'],
          user: '林情情',
          total: 128,
        },
        {
          city: '江苏省苏州市',
          number: 78000,
          type: ['信函', '个性化'],
          user: '林情情',
          total: 128,
        },
        {
          city: '江苏省苏州市',
          number: 61000,
          type: ['保单'],
          user: '李含笑',
          total: 128,
        },
      ],
    }
  },
  methods: {
    addChinese(number) {
      return number > 10000
        ? addChineseUnit(number, 2).addDec
        : addChineseUnit(number, 2)
    },
  },
}
</script>

<style scoped>
p {
  margin: 5px 0;
}
.left {
  text-align: left;
}

.right {
  text-align: right;
}
.dataPrinted-header {
  border-left: 5px solid rgb(41, 198, 243);
  padding: 0px 15px;
}
.dataPrinted-header-title {
  color: rgb(41, 198, 243);
  font-weight: bold;
}
.dataPrinted-header-titleSub {
  font-size: 12px;
  color: grey;
}
.dataPrinted-header-more {
  color: rgb(41, 198, 243);
  font-weight: bold;
}
.dataPrinted-main {
  height: 130px !important ;
  min-width: 260px !important;
  font-size: 12px !important;
  /* color: rgb(248, 244, 244); */
}
.dataPrinted-main-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px !important;
  /* color:#fff */
}

/* 所在城市 */
.show-city {
  background: rgb(50, 197, 210);
  width: 85px;
  border-radius: 10px;
  padding: 3px;
  text-align: center;
  color: #fff;
}

/* 冠军奖杯 */
.show-win {
  color: rgb(253, 239, 177);
  font-size: 24px;
}

/* 打印点排位名次 */
.show-ranking {
  position: absolute;
  right: 9px;
  top: 3px;
  color: #fff;
}
</style>

