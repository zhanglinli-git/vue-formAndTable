<!--
 * @Descripttion: 用于封装公共Table组件
 * @Author: zhanglinli
 * @Date: 2020-07-21 17:16:25
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-08 14:12:55
-->
<!-- 封装的table-->
<template>
  <div class="table">
    <!-- 封装的列设置工具-->
    <toolbar
      v-if="showTool"
      :style="`margin:5px 0px;`"
      :columns="columnData"
      style="margin-right:10px"
      @columns-filter-changed="handleColumnsFilterChanged"
    ></toolbar>
    <el-table
      v-if="tableFresh"
      :key="timer"
      ref="mutipleTable"
      :data="list"
      :border="true"
      :height="height"
      :stripe="stripe"
      :row-key="rowTreeKeys ? rowTreeKeys : rowKeys"
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChild'}"
      :default-expand-all="expand"
      fit
      lazy
      highlight-current-row
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <!-- 选择框 -->
      <el-table-column
        v-if="mutiSelect"
        :reserve-selection="true"
        type="selection"
        style="width: 30px;margin-right: 10px;"
        align="center"
      />
      <!-- 详情展开插槽 -->
      <el-table-column v-if="expendDetail" type="expand">
        <template slot-scope="scope">
          <div class="el-table-expand">
            <slot :row="scope.row" name="expendDetail"></slot>
          </div>
        </template>
      </el-table-column>

      <!-- 序号 -->
      <el-table-column
        v-if="tableIndex"
        label="序号"
        width="50px"
        align="center"
        type="index"
        :index="(page-1)*limit+1"
      />
      <!--数据列-->
      <template v-for="(column,index) in columnData">
        <el-table-column
          v-if="column.show === undefined || column.show === null || column.show"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          min-width="105px"
          :width="column.showTooltip ? column.width && column.showTooltip ? column.width : '180px' :column.width"
          :sortable="column.sortable"
        >
          <!-- 表单格式化 -->
          <template slot-scope="scope">
            <template v-if="column.formatter">
              <template v-if="column.cellClick">
                <span
                  class="cellClick"
                  type="text"
                  @click="column.cellClick(scope.row) && hasPermissions(column.code)"
                >
                  <template v-if="column.fileType">
                    <el-tooltip class="item" effect="dark" placement="top-start" max-width="600px">
                      <div slot="content">
                        <span v-html="column.formatter(scope.row, column)" />
                      </div>
                      <a style="color: #409EFF">
                        <span
                          v-html=" column.formatter(scope.row, column).substring(0, 10) + '...'"
                        />
                      </a>
                    </el-tooltip>
                  </template>
                  <template
                    v-else-if=" scope.row[column.prop] && (scope.row[column.prop].length > 10 || scope.row[column.prop] instanceof Array && scope.row[column.prop].length > 1)"
                  >
                    <el-tooltip class="item" effect="dark" placement="right" max-width="600px">
                      <div slot="content">
                        <span v-html="column.formatter(scope.row, column)" />
                      </div>
                      <span v-html=" column.formatter(scope.row, column).substring(0, 10) + '...'" />
                    </el-tooltip>
                  </template>
                  <template v-else>
                    <span v-html="column.formatter(scope.row, column)" />
                  </template>
                </span>
              </template>
              <template v-else-if="column.showTooltip && column.formatter(scope.row, column)">
                <el-tooltip class="item" effect="dark" placement="top-start" max-width="600px">
                  <div slot="content">
                    <span v-html="column.formatter(scope.row, column)" />
                  </div>
                  <span>
                    <template v-if="column.formatter(scope.row, column).length > 10">
                      <span v-html=" column.formatter(scope.row, column).substring(0,10) + '...'" />
                    </template>
                    <template v-else>
                      <span v-html="column.formatter(scope.row, column)" />
                    </template>
                  </span>
                </el-tooltip>
              </template>
              <template v-else>
                <span v-html="column.formatter(scope.row, column)" />
              </template>
            </template>
            <template v-else-if="column.showTooltip && scope.row[column.prop]">
              <el-tooltip class="item" effect="dark" placement="top-start" max-width="600px">
                <div slot="content">
                  <span v-html="scope.row[column.prop]" />
                </div>
                <span>
                  <template v-if="scope.row[column.prop].length > 10">
                    <span>{{ scope.row[column.prop] && scope.row[column.prop].substring(0, column.showDataLength?column.showDataLength:10) + '...' }}</span>
                  </template>
                  <template v-else>
                    <span>{{ scope.row[column.prop] }}</span>
                  </template>
                </span>
              </el-tooltip>
            </template>
            <template v-else-if="column.slot">
              <slot :value="scope.row[column.prop]" name="specColumn" />
            </template>
            <template v-else>
              <span>{{ scope.row[column.prop] }}</span>
            </template>
          </template>
        </el-table-column>
      </template>

      <!--按钮操作组-->
      <template v-if="operates">
        <el-table-column
          v-if="operates.list.filter(_x=>_x.show === true).length > 0"
          ref="fixedColumn"
          label="设置"
          :align="operates.align ? operates.align : 'center'"
          :width="getOperWidth(operates.list.filter((_x) => _x.show === true))"
          :fixed="operates.fixed"
        >
          <template slot-scope="scope">
            <div class="operate-group">
              <template v-for="(btn) in operates.list">
                <span v-if="btn.show" :key="btn.id" class="item">
                  <template v-if="btn.labelChange && btn.labelChange[(scope.row[(btn.changeId)])]">
                    <el-button
                      v-if="btn.labelChange[(scope.row[(btn.changeId)])]"
                      v-permission="btn.code"
                      :class="{'setbtn':btn.icon}"
                      :style="`color:${btn.color}`"
                      :type="btn.type"
                      size="mini"
                      :icon="btn.icon"
                      :disabled="btn.disabled"
                      :plain="btn.plain"
                      @click.native.prevent="btn.method(btn.id,scope.row)"
                    >{{ btn.labelChange[(scope.row[(btn.changeId)])] }}</el-button>
                  </template>
                  <template v-if="btn.label">
                    <el-button
                      v-permission="btn.code"
                      :class="{'setbtn':btn.icon}"
                      :type="btn.type"
                      :style="`color:${btn.color}`"
                      size="mini"
                      :icon="btn.icon"
                      :disabled="btn.disabled"
                      :plain="btn.plain"
                      @click.native.prevent="btn.method(btn.id,scope.row)"
                    >{{ btn.label }}</el-button>
                  </template>
                </span>
              </template>
              <template>
                <slot :value="scope.row" name="more"></slot>
              </template>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'CommonTable',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 5,
    },
    rowKeys: {
      type: Function,
      default: () => {},
    },
    rowTreeKeys: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '540px',
    },
    list: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    mutiSelect: {
      type: Boolean,
      default: false,
    },
    tableIndex: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    expendDetail: {
      type: Boolean,
      default: false,
    },
    isShowTool: {
      type: Boolean,
      default: true,
    },
    // 操作按钮组
    // label: 文本，
    // type :类型（primary / success / warning / danger / info / text）
    // show：是否显示
    // icon：按钮图标，
    // plain：是否朴素按钮
    // disabled：是否禁用
    // method：回调方法
    operates: { type: Object, default: () => {} },
  },
  data() {
    return {
      multipleSelection: [], // 多行选中
      expand: false,
      timer: '',
      columnData: [],
      tableFresh: true,
      showTool: true,
    }
  },
  computed: {
    // 操作项宽度计算 字体个数 * 字体宽度12px + 按钮间距*按钮个数
    getOperWidth: () => {
      return (data) => {
        let btnSum = 0
        for (const item of data) {
          btnSum =
            (item.label && item.icon && item.label?.length + btnSum + 1) ||
            (item.label && item.label?.length + btnSum) ||
            2 + btnSum
        }
        return (
          (data?.length === 1 && btnSum * 12 + data?.length * 20 + 20) ||
          btnSum * 12 + data?.length * 20
        )
      }
    },
  },
  watch: {
    columns(value) {
      this.tableFresh = false
      this.columnData = value
      this.$nextTick(() => (this.tableFresh = true))
    },
  },
  mounted() {
    this.columnData = this.columns
    // 判断详情页不展示列设置
    this.$route.name.includes('Details')
      ? (this.showTool = false)
      : (this.showTool = this.isShowTool)
  },
  methods: {
    // 树形表格展开
    isExpand() {
      this.expand = true
      this.timer = new Date().getTime().toString()
    },
    // 树形表格关闭
    isClose() {
      this.expand = false
      this.timer = new Date().getTime().toString()
    },
    load(tree, treeNode, resolve) {
      this.$emit('load', tree, treeNode, resolve)
    },
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    // 行数据获取
    handleCurrentChange(row) {
      this.$emit('handleCurrentChange', row)
    },
    // 修改单元格样式
    timeStyle(column) {
      if (column.columnIndex === 0) {
        return 'background: #eef1f6 '
      }
    },
    // 更新子节点数据
    updateChildren(id, data) {
      this.$set(this.$refs.mutipleTable.store.states.lazyTreeNodeMap, id, data)
      this.$emit('updateChildren', id, data)
    },
    // 更新子组件toggleRowSelection
    toggleRowSelection(row) {
      this.$refs.mutipleTable.toggleRowSelection(row, true)
      this.$emit('toggleRowSelection', row)
    },
    // 清空子组件toggleRowSelection
    clearSelection() {
      this.$refs.mutipleTable.clearSelection()
      this.$emit('clearSelection')
    },
    // 修改单元格样式
    switchValue(column) {
      if (column.columnIndex === 0) {
        return 'background: #eef1f6 '
      }
    },
    // 列过滤操作
    handleColumnsFilterChanged(e) {
      this.columnData = e
    },
  },
}
</script>

<style >
/* //Table行数据鼠标移动上去样式 */
/* 用来设置当前页面element全局table 选中某行时的背景色*/
/* .el-table tbody tr:hover > td,
.el-table__body tr.current-row > td {
  background-color: rgb(227, 228, 230) !important;
} */

.el-table .el-table__header tr,
.el-table .el-table__header th {
  padding: 0 !important;
  height: 25px !important;
}
.el-table .el-table__body tr,
.el-table .el-table__body td {
  padding: 0 !important;
  height: 25px !important;
}

.el-dialog .el-table .el-table__body tr,
.el-dialog .el-table .el-table__body td {
  /* padding: 10px !important; */
  height: 25px !important;
}

.el-table .el-table__header .gutter {
  /* background: rgb(238, 241, 246);
  width: 6px !important; */
}
.el-table {
  font-size: 12px !important;
  margin-top: 15px;
}
</style>

<style lang="scss" scoped>
// <!-- 鼠标移入需要改变样式的单元格时，该单元格改变样式 -->
.el-table .cell:hover {
  .hover {
    color: rgb(18, 157, 250);
    cursor: pointer;
  }
}

.item .el-button--text:hover {
  cursor: pointer;
  font-weight: bold;
}
.setbtn {
  padding: 5px 3px !important;
}
.operate-group {
  .el-button {
    margin-right: 5px;
  }
}
.el-icon-thumb {
  // color: rgb(18, 157, 250);
  padding-top: -13px;
  margin-top: 5px;
  transform: rotate(270deg);
  -ms-transform: rotate(270deg); /* IE 9 */
  -moz-transform: rotate(270deg); /* Firefox */
  -webkit-transform: rotate(270deg); /* Safari 和 Chrome */
  -o-transform: rotate(270deg); /* Opera */
}
.el-table-expand {
  min-height: 100px !important;
  margin: 10px 100px;
}
</style>
<style>
.expend-title {
  font-size: 14px !important;
  /* font-weight: bold !important; */
  color: #2d8cf0;
  width: 60px;
  padding: 8px 0px;
  text-align: right;
  margin-right: 10px;
}
.expend-body {
  font-size: 14px;
  color: #515a6e;
  padding: 8px 0px;
}
.el-table--scrollable-x .el-table__body-wrapper {
  z-index: 2;
}
.el-table__body {
  z-index: 20;
}
.el-table__fixed,
.el-table__fixed-right {
  box-shadow: none !important;
}
.cellClick :hover {
  cursor: pointer;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px; /*滚动条宽度*/
  height: 10px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background-color: rgba(221, 222, 224); /*滚动条的背景颜色*/
}
.el-table__fixed-right {
  height: auto !important;
  bottom: 11px !important;
}

.el-table__fixed-right::before,
.el-table__fixed::before {
  background: none !important;
}

.el-table-column--selection .cell {
  padding-right: 11px !important;
}
</style>
