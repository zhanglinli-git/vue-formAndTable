<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2020-12-08 09:16:02
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-02-01 14:21:44
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix container-page-title">
      <span class="title">
        <el-button
          type="primary"
          icon="el-icon-s-grid"
          circle
          size="mini"
          plain
          style="margin-right:8px"
        />信函待办事务
      </span>
    </div>
    <div v-if="data.length > 0" class="container-page-main">
      <el-row style="text-align:center" type="flex" justify="center">
        <template v-for="(item,index) in data">
          <el-col :key="index" :span="8" @click.native="toLint(item.label)">
            <font :class="'purple'">{{ item.count }}</font>
            <br />
            <div class="p-label"> 待{{ item.label }}信函</div>
          </el-col>
        </template>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWaitDeal } from '@/api/firstPageApi'
import { getTreeFindItem } from '@/utils/public'

export default {
  data() {
    return {
      data: [],
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    // 信函待处理事务-右
    const getWaitDealParam = { type: 'LETTER' }
    getWaitDeal(getWaitDealParam).then((res) => {
      this.data = res.data
      // this.data.push({ count: 10, label: '延时' })
    })
  },
  methods: {
    toLint(name) {
      switch (name) {
        case '地址质检':
          this.filterPath('LetterAddressQuality')
          break
        case '特殊数据审核':
          this.filterPath('LetterSpecialDataCheck')
          break
        case '重复数据审核':
          this.filterPath('LetterRepeatDataCheck')
          break
        case '电邮地址审核':
          this.filterPath('LetterMailAddressCheck')
          break
      }
    },
    filterPath(name) {
      getTreeFindItem(this.$router.options.routes, name)
        ? this.$router.push({
            name: name,
          })
        : ''
    },
  },
}
</script>
<style scoped>
.purple {
  font-weight: bold;
  font-size: 30px;
  color: #69c0ff;
}
.p-label {
  margin-top: 15px;
  font-size: 12px;
  color: grey;
}
.title {
  color: #515a6e;
}
</style>

