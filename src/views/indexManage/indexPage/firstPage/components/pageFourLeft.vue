<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:30:47
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-07 17:48:28
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix container-page-title">
      <span>保单总览</span>
    </div>

    <div class="container-page-main">
      <cross-histogram v-if="isTrue" :data="data" key-value="1" />
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOverView } from '@/api/firstPageApi'
import { CrossHistogram } from '@/components'

export default {
  components: { CrossHistogram },
  data() {
    return {
      isTrue: false,
      textIcon: ['#86b3fe ', '#ac85f4	', '#8692fe', '#6DD48B'],
      data: {
        yData: ['待打印(邮件发送)', '已完成', '待质检', '总数据'],
        series: [],
      },
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    // 保单总览-左
    const overViewPolicyParam = { type: 'POLICY' }
    getOverView(overViewPolicyParam).then((res) => {
      this.data.yData.forEach((pre, index) => {
        this.data.series[index] = res?.data?.filter(
          (item) => item?.label === this.data?.yData[index]
        )[0]?.count
      })
      this.isTrue = true
    })
  },
}
</script>

