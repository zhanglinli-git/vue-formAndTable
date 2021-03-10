<!--
 * @Descripttion: 首页
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:03:22
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-10 16:33:21
-->
<template>
  <div class="app-container">
    <el-row type="flex" justify="center">
      <el-col :span="24" class="indexPage">
        <div class="pageOne">
          <el-row>
            <page-one />
          </el-row>
        </div>
        <div class="pageTwo">
          <el-row type="flex" justify="space-between">
            <el-col :span="12" class="left">
              <page-two-left />
            </el-col>
            <el-col :span="12">
              <page-two-right />
            </el-col>
          </el-row>
        </div>
        <div class="pageFour">
          <el-row type="flex" justify="space-between">
            <el-col :span="12" class="left">
              <page-four-left1 />
            </el-col>
            <el-col :span="12">
              <page-four-right1 />
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" style="margin-top:15px">
            <el-col :span="12" class="left">
              <page-four-left />
            </el-col>
            <el-col :span="12">
              <page-four-right />
            </el-col>
          </el-row>
        </div>
        <div class="pageFive">
          <page-five />
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
  min-width: 1000px !important;
}
.pageOne /deep/ .top-one {
  height: 80px !important ;
  /* border: 1px solid rgb(226, 226, 226) !important; */
  border-radius: 4px !important;
  font-size: 14px !important;
  /* padding: 25px; */
  display: flex;
  text-align: center;
  /* justify-content: center; 水平居中 */
  align-items: center;
}
.left {
  margin-right: 20px !important;
}
.pageOne,
.pageTwo,
.pageThree,
.pageFour,
.pageFive,
.pageSix {
  border-radius: 4px !important;
  margin-bottom: 15px !important;
}
</style>
