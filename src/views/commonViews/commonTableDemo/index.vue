<!--
 * @Descripttion: 该页面用于——表单控件封装组件使用
 * @Author: zhanglinli
 * @Date: 2021-02-24 15:23:14
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-08 11:17:07
-->
<template>
  <div style="margin:50px 50px">
    <prop-desc />
    <el-row type="flex" justify="between">
      <!-- 索引表格 -->
      <el-card>
        涉及非基本属性：
        <br />
        <font style="color:red">
          table-index
          limit page
        </font>
        is-show-tool height
        <common-table
          ref="checkTable"
          :columns="columns"
          :list="list"
          :row-keys="(row) => { return row.id }"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pageSize"
          table-index
          is-show-tool
          height="300"
        />
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pageSize"
          @pagination="fetchData"
        />
      </el-card>
      <!-- 多选表格 -->
      <el-card>
        涉及非基本属性：
        <br />
        <font style="color:red">muti-select</font>
        is-show-tool height
        <common-table
          ref="checkTable"
          :columns="columns"
          :list="list"
          :row-keys="(row) => { return row.id }"
          muti-select
          is-show-tool
          height="300"
          @handleSelectionChange="handleSelectionChange"
        />
      </el-card>
    </el-row>
    <el-row type="flex" justify="between">
      <!-- 操作项表格 -->
      <el-card>
        涉及非基本属性：
        <br />
        <font style="color:red">operates</font>
        is-show-tool height
        <br />
        <common-table
          ref="checkTable"
          :columns="columns"
          :operates="operates"
          :list="list"
          :row-keys="(row) => { return row.id }"
          is-show-tool
          height="300"
        />
      </el-card>
      <!-- 树形数据与懒加载表格 -->
      <el-card>
        树形表格懒加载,涉及非基本属性：具体看element官网
        <br />
        <font style="color:red">@load方法 是否有下级数据判断字段为hasChild</font>
        <br />is-show-tool height
        <common-table
          ref="checkTable"
          :columns="columns"
          :list="treeList"
          row-tree-keys="id"
          is-show-tool
          height="300"
          @load="load"
        />
      </el-card>
    </el-row>
    <el-row type="flex" justify="between">
      <!-- 行展开表格 -->
      <el-card>
        涉及非基本属性：
        <br />
        <font style="color:red">expend-detail</font> is-show-tool height
        <common-table
          ref="checkTable"
          :columns="columns"
          :list="list"
          :row-keys="(row) => { return row.id }"
          is-show-tool
          expend-detail
          height="300"
        >
          <template v-slot:expendDetail="message">{{ message.row }}</template>
        </common-table>
      </el-card>
      <!-- 如何进行二次封装及使用 -->
      <package-use />
    </el-row>
    <el-card class="descMethods">
      涉及常用方法:
      <div>
        行选择：
        <p class="desc">@handleCurrentChange="handleCurrentChange"</p>
      </div>
      <div>
        多行选择：
        <p class="desc">@handleSelectionChange="handleSelectionChange"</p>
      </div>
      <div>
        全选反选涉及方法：
        <p class="desc">
          行勾选：this.$refs.checkTable.toggleRowSelection(row)
          <br />勾选数据清除：this.$refs.checkTable.clearSelection()
        </p>
      </div>
      <div>
        树形表格涉及方法：
        <p class="desc">
          树形节点展开：this.$refs.checkTable.isExpand()
          <br />树形节点关闭：this.$refs.checkTable.isClose()
        </p>
      </div>
    </el-card>
  </div>
</template>
<script>
import { CommonTable, Pagination } from '@/components'
import { listSearch } from './index.js'
import PropDesc from './components/desc.vue'
import PackageUse from './components/package.vue'

export default {
  components: {
    CommonTable,
    Pagination,
    PropDesc,
    PackageUse,
  },
  data() {
    return {
      /** CommonTable 参数 */
      loading: false,
      columns: columns,
      list: [],
      treeList: [],
      operates: {
        width: 220,
        fixed: 'right',
        list: [
          {
            id: '1', // 按钮列表key值
            label: '删除', // 按钮文本
            color: '#ED4014', // 按钮文本颜色
            type: 'text', // 按钮类型（primary / success / warning / danger / info / text）
            show: true, // 是否显示
            code: 'wllxsc', // 权限代码
            icon: 'el-icon-delete', // 按钮图标
            plain: true, // 是否朴素按钮
            disabled: false, // 是否禁用
            // 回调方法
            method: (index, row) => {
              // 进行删除操作，调用删除接口
              alert(JSON.stringify(row))
            },
          },
          {
            id: '2', // 按钮列表key值
            // changeId/labelChange：搭配使用，用于判断按钮是否显示
            // (changeId: 	'isDelete',labelChange: { true: '删除' })
            changeId: 'active',
            labelChange: { 0: '启用' },
            type: 'primary', // 按钮类型（primary / success / warning / danger / info / text）
            show: true, // 是否显示
            code: 'wllxsc', // 权限代码
            icon: 'el-icon-edit', // 按钮图标
            plain: true, // 是否朴素按钮
            disabled: false, // 是否禁用
            // 回调方法
            method: (index, row) => {
              // 进行详情操作
              alert(JSON.stringify(row))
            },
          },
          {
            id: '3', // 按钮列表key值
            // changeId/labelChange：搭配使用，用于判断按钮是否显示
            // (changeId: 	'isDelete',labelChange: { true: '删除' })
            changeId: 'active',
            labelChange: { 1: '禁用' },
            type: 'success', // 按钮类型（primary / success / warning / danger / info / text）
            show: true, // 是否显示
            code: 'wllxsc', // 权限代码
            icon: 'el-icon-edit', // 按钮图标
            plain: true, // 是否朴素按钮
            disabled: false, // 是否禁用
            // 回调方法
            method: (index, row) => {
              // 进行详情操作
              alert(JSON.stringify(row))
            },
          },
        ],
      },
      /** Pagination 参数 */
      total: 0, // 数据总条数
      listQuery: {
        page: 1, //  默认第一页
        pageSize: 5, //  每页2条数据
      },
      // 多选数据存储
      multipleSelection: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 初始化数据
    fetchData() {
      this.loading = true
      listSearch(this.listQuery).then((res) => {
        this.list = res?.data
        this.treeList = res?.treeData
        this.total = res?.total
        this.loading = false
      })
    },
    // 树形懒加载数据获取
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 21,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 22,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
        ])
      }, 1000)
    },
    // 多行选中
    handleSelectionChange(row) {
      this.multipleSelection = JSON.parse(JSON.stringify(row))
      alert(JSON.stringify(row))
    },
  },
}
const columns = [
  {
    prop: 'name',
    label: '姓名',
    align: 'center',
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
p {
  display: inline-flex;
  margin-right: 20px;
  font-size: 16px;
}
div {
  font-size: 18px;
  font-weight: 600;
}
.el-card {
  margin: 10px;
  min-width: 600px;
}
a {
  color: #5f7d9bd3;
}
.desc,
.descColumns p {
  color: #5f7d9bd3;
  font-size: 14px;
}
.descMethods p {
  display: block !important;
}
.descMethods div {
  font-size: 16px;
  margin: 30px;
}
</style>
