<!--
 * @Descripttion: 该页面用于——二次封装案例
 * @Author: zhanglinli
 * @Date: 2021-03-05 10:38:16
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-05 14:05:26
-->

<template>
  <el-row type="flex" justify="between">
    <!-- 二次封装——列名插槽 -->
    <el-card>
      二次封装插槽
      <br />涉及非基本属性：
      <font style="color:red">slot:true</font>
      <br />
      <common-table
        ref="checkTable"
        :columns="columns"
        :list="list"
        :row-keys="(row) => { return row.id }"
        is-show-tool
        height="300"
      >
        <template v-slot:specColumn="message">
          <el-tag type="success" size="mini" effect="plain">{{ message.value }}</el-tag>
        </template>
      </common-table>
    </el-card>
  </el-row>
</template>
<script>
import { CommonTable } from '@/components'
import { listSearch } from '../index.js'

export default {
  name: 'PackageUse',
  components: {
    CommonTable,
  },
  data() {
    return {
      /** CommonTable 参数 */
      loading: false,
      columns: columns,
      list: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      listSearch().then((res) => {
        this.list = res?.data
        this.total = res?.total
        this.loading = false
      })
    },
  },
}
// 表头数据
const columns = [
  {
    prop: 'name',
    label: '姓名',
    align: 'center',
    slot: true,
  },
  {
    prop: 'date',
    label: '时间',
    align: 'center',
    sortable: true,
  },
  {
    prop: 'address',
    label: '地址',
    align: 'center',
    showTooltip: true,
  },
  {
    prop: 'active',
    label: '状态',
    align: 'center',
    cellClick: (row) => {
      alert(row?.active)
    },
    formatter: (row) => {
      return row?.active === 1 ? '有效' : '无效'
    },
  },
]
</script>
<style scoped>
.el-card {
  margin: 10px;
  max-width: 800px;
  min-width: 600px;
}
</style>
