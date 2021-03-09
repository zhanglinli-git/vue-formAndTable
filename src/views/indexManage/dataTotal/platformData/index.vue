<!--
 * @Descripttion: 该页面用于——平台数据
 * @Author: zhanglinli
 * @Date: 2020-09-18 11:02:37
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-04 16:28:02
-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="container-page-main">
        <!--数据概要-->
        <div class="main-item">
          <show-summary />
        </div>
        <!--整体分布图-->
        <div class="main-item">
          <show-overall />
        </div>
        <el-row style="min-width:1000px">
          <el-col :span="12">
            <!--类型比例-->
            <div class="main-item">
              <show-type />
            </div>
          </el-col>
          <el-col :span="12">
            <!--材质比例-->
            <div class="main-item">
              <show-material />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
// webpack动态导入文件--require.context( )
const allComponents = require.context('./components', false, /^.*\.vue$/)
const res_components = {}
allComponents.keys().forEach((fileName) => {
  const comp = allComponents(fileName)
  res_components[fileName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
})

export default {
  components: res_components,
}
</script>

<style scoped>
.main-item {
  border: 1px solid rgba(236, 234, 234, 0.699) !important;
  padding: 25px !important;
  margin: 20px !important;
  min-width: 500px !important;
}
</style>
