<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2020-10-20 17:12:39
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-09 11:40:08
-->
<template>
  <div class="app-container">
    <el-row type="flex" justify="center">
      <el-col :span="23" class="indexPage">
        <div class="pageOne">
          <page-one />
        </div>
        <div class="pageTwo">
          <page-two />
        </div>
        <div class="pageThree">
          <page-three />
        </div>
      </el-col>
    </el-row>
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
.indexPage {
  /* min-width: 1000px !important; */
  margin-top: 20px !important;
}
.pageOne,
.pageTwo,
.pageThree {
  margin-bottom: 40px;
  border-radius: 0px !important;
}
</style>

