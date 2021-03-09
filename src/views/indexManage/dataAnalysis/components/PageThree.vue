<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:31:54
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-10-26 13:52:56
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix container-page-title">
      <el-row>
        <el-col :span="24">
          <div class="dataAnalysis-header">
            <p class="dataAnalysis-header-title">数据分析</p>
            <p class="dataAnalysis-header-titleSub">通过数据处理时效与占用进行统计展示</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container-page-main" style="margin-bottom:20px">
      <el-row type="flex" justify="space-between">
        <el-col :span="7">
          <page-three-left style="margin-left:-28px" />
        </el-col>
        <el-col :span="7">
          <page-three-center style="margin-left:-30px" />
        </el-col>
        <el-col :span="7">
          <div>
            <page-three-right style="margin-left:-15px" />
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
// webpack动态导入文件--require.context( )
const allComponents = require.context('./', false, /^.*\.vue$/)
const res_components = {}
allComponents.keys().forEach((fileName) => {
  const comp = allComponents(fileName)
  res_components[fileName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
})
export default {
  components: res_components,
  data() {
    return {
      components: res_components,
    }
  },
}
</script>

<style scoped>
.dataAnalysis-header {
  border-left: 5px solid rgb(41, 198, 243);
  padding: 0px 15px;
}
.dataAnalysis-header-title {
  color: rgb(41, 198, 243);
  font-weight: bold;
}
.dataAnalysis-header-titleSub {
  font-size: 12px;
  color: grey;
}
</style>

