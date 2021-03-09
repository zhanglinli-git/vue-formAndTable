<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:26:44
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-22 15:01:28
-->
<template>
  <div>
    <p class="title">数据分析</p>
    <el-row type="flex" justify="between">
      <el-col :span="12">
        <page-three-left />
      </el-col>
      <el-col :span="12">
        <page-three-right />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PageThreeLeft from './pageThree/pageThreeLeft.vue'
import PageThreeRight from './pageThree/pageThreeRight.vue'

export default {
  name: 'PageThree',
  components: { PageThreeLeft, PageThreeRight },
}
</script>
<style scoped>
.title {
  font-size: 19px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: #000000;
  opacity: 1;
}
</style>
