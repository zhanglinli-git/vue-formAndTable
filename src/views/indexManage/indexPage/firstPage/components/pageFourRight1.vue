<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-01-12 16:22:18
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-14 15:31:52
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
        />信函总览
      </span>
    </div>

    <div class="container-page-main">
      <el-row type="flex" justify="center">
        <ring v-if="data.series.length>0" :data="data" key-value="1" />
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOverView } from '@/api/firstPageApi'
import { Ring } from '@/components'

export default {
  components: { Ring },
  data() {
    return {
      isTrue: false,
      data: {
        extend: {},
        legendData: [],
        series: [],
        centerTitle: '信函总量',
      },
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    // 信函总览-右
    const overViewPolicyParam = { type: 'LETTER' }
    getOverView(overViewPolicyParam).then((response) => {
      const data = response.data
      if (data) {
        this.data.series = []
        this.data.legendData = []
        // 删除总数据
        data.splice(
          data.findIndex((item) => item.label === '总数据'),
          1
        )
        data.forEach((d) => {
          const { count: value, label: name } = d
          this.data.legendData.push(name)
          this.data.series.push({ value: value, name: name })
        })
        this.isTrue = true
      } else {
        this.$Confirm.handleAlert('保单总览数据获取失败！', 'error')
      }
    })
  },
}
</script>
<style scoped>
.title {
  color: #515a6e;
}
</style>
