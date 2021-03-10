<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:26:44
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-27 20:07:54
-->
<template>
  <el-row type="flex" justify="space-between">
    <template v-for="(item) in 4">
      <el-col :key="item" :span="6" :style="item !== 1 ? 'margin-left:20px':''">
        <el-card @click.native="toLint(textTitle[item - 1])">
          <el-row type="flex" justify="between" class="top-one">
            <el-col :span="15" class="top-one-left">
              <div class="top-one-title">{{ textTitle[item - 1] }}</div>
              <div
                class="top-one-value"
                :style="{'color':textValue[item - 1]}"
              >{{ data[item-1] ? data[item-1] : 0 }}</div>
            </el-col>
            <el-col :span="10" class="top-one-right">
              <i
                class="el-icon-tickets"
                style="font-size:64px;"
                :style="{'color':textIcon[item - 1]}"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
import { getCountByAcceptTime } from '@/api/firstPageApi'
import { getTreeFindItem } from '@/utils/index'

export default {
  data() {
    return {
      textValue: ['#2D8CF0', '#95DE64	', '#69C0FF', '#B37FEB'],
      textIcon: ['#2D8CF0', '#95DE64	', '#69C0FF', '#B37FEB'],
      textTitle: [
        '今日保单总数',
        '今日信函总数',
        '昨日保单总数',
        '昨日信函总数',
      ],
      link: [],
      data: [],
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    this.fetchData()
  },
  methods: {
    toLint(name) {
      if (
        name.includes('保单') &&
        getTreeFindItem(this.$router.options.routes, 'PolicySelect')
      ) {
        this.$router.push({
          name: 'PolicySelect',
        })
      } else if (
        name.includes('信函') &&
        getTreeFindItem(this.$router.options.routes, 'LetterSelect')
      ) {
        this.$router.push({
          name: 'LetterSelect',
        })
      }
    },
    fetchData() {
      // 保单、信函今日、昨日统计
      const param = {}
      getCountByAcceptTime(param).then((res) => {
        this.data = [
          parseFloat(res.data.policyTotalToday).toLocaleString(),
          parseFloat(res.data.letterTotalToday).toLocaleString(),
          parseFloat(res.data.policyTotalYes).toLocaleString(),
          parseFloat(res.data.letterTotalYes).toLocaleString(),
        ]
      })
    },
  },
}
</script>

<style scoped>
.top-one {
  border: none;
}
.top-one-left {
  text-align: left;
  margin-right: 25px;
}
.top-one-title {
  font-size: 16px;
  margin-bottom: 22px !important;
}
.top-one-value {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
</style>
