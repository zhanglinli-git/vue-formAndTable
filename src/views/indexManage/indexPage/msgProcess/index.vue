
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix container-page-title">
        <span>数据筛选</span>
      </div>

      <div class="container-page-main">
        <!-- 表单组件 -->
        <common-form
          :form-item-list="formItemList"
          :inline="true"
          :item-width="180"
          :show-reset-btn="true"
          :show-search-btn="true"
          :is-search-area="true"
          :submit-handler="submitHandler"
        />
      </div>
<!--    </el-card>-->

<!--    <el-card class="box-card">-->
<!--      <div slot="header" class="clearfix container-page-title">-->
<!--        <span>数据列表</span>-->
<!--      </div>-->

      <div class="container-page-main" style="padding-bottom:20px">
        <!-- 按钮组件 -->
        <!-- <common-button :buttons="buttons" :funcList="funcList" style="background: rgb(238, 241, 246)"></common-button> -->

        <!-- 表格组件 -->
        <common-table
          ref="checkTable"
          :list="list.slice((listQuery.currentPage-1)*listQuery.pagesize,listQuery.currentPage*listQuery.pagesize)"
          :columns="columns"
          muti-select
          :table-index="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        />

        <el-row type="flex" style="height:32px;min-width:750px">
          <el-col :span="12">
            <div class="grid-content bg-purple" style="float:left;padding:12px 0px">
              <el-button type="mini">
                <el-checkbox @change="getAllChecked">全选</el-checkbox>
              </el-button>
              <el-button type="mini">
                <el-checkbox @change="getInvertChecked">反选</el-checkbox>
              </el-button>
              <!--
              <el-select
                size="small"
                v-model="value"
                placeholder="更多操作"
                style="margin-left:12px;width:130px;padding:5px 0px"
                disabled
              ></el-select>-->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light" style="float:right">
              <!-- 分页组件 -->
              <pagination
                :total="total"
                :page.sync="listQuery.currentPage"
                :limit.sync="listQuery.pagesize"
                @pagination="fetchData"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 处理消息弹窗 开始-->
    <el-dialog title="处理消息" :visible.sync="show.msgDialog" width="580px">
      <common-form
        v-if="show.msgDialog"
        ref="msgFormRef"
        :form-item-list="msgItemList"
        :item-width="300"
        style="margin-left:30px"
      />
      <span slot="footer" class="dialog-footer">
        <el-button
          icon="el-icon-refresh-right"
          @click="()=>{ this.$refs.msgFormRef.resetForm(); }"
        >重 置</el-button>
        <el-button icon="el-icon-collection" @click="show.msgDialog = false">确定</el-button>
        <el-button icon="el-icon-close" @click="show.msgDialog = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 处理消息弹窗 结束-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { handleAlert } from '@/utils/confirm'
import { getPathFilters, getFunc, getArrDifference } from '@/utils/public'
import { Pagination, CommonForm, CommonTable } from '@/components'
import { objectDeleteEmptyItem, objValueToObValue } from '@/utils/public'
import { activeStyle } from '@/utils/activeStyle'
export default {
  components: { Pagination, CommonForm, CommonTable },
  data() {
    return {
      /** 处理消息弹窗 */
      show: {
        msgDialog: false,
      },
      msgItemList: [],

      /** CommonTable 参数 */
      list: [], // 表格数据
      initData: [], // 初始化数据
      columns: [
        {
          prop: 'message',
          label: '消息内容',
          align: 'center',
          showTooltip: true,
        },
        {
          prop: 'createTime',
          label: '接受时间',
          align: 'center',
          width: '150px',
        },
        {
          prop: 'msgTypeName',
          label: '消息类型',
          align: 'center',
          formatter: (row) => {
            return row.msgTypeName === '1' ? '服务器异常' : ''
          },
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          sortable: true,
          width: '140px',
          cellClick: (row) => {
            row.status === '0'
              ? ((this.show.msgDialog = true),
                (this.msgItemList = [
                  {
                    prop: 'message',
                    label: '消息内容：',
                    labelWidth: '110',
                    itemWidth: '350',
                    selected: row.message,
                    rules: [{ required: true, trigger: 'blur' }],
                    readonly: true,
                  },
                  {
                    prop: 'remark',
                    label: '处理备注：',
                    itemType: 'textarea',
                    itemWidth: '350',
                    labelWidth: '110',
                    placeholder: '请输入处理的备注信息',
                  },
                ]))
              : ''
          },
          formatter: (row) => {
            if (row.status === '0') {
              return `<div style="width:5px;height:5px;border-radius:50%;background-color:blue;top: 16px;left: 26%;position: absolute;}"></div>
              <a style="color: blue;">未处理</a>`
            }
            if (row.status === '1') {
              return `<div style="width:5px;height:5px;border-radius:50%;background-color:green;top:16px;left: 26%;position: absolute;}"></div>
              <span>已处理</span>`
            }
          },
        },
        {
          prop: 'processTime',
          label: '处理时间',
          align: 'center',
          width: '150px',
          sortable: true,
        },
        {
          prop: 'processUserName',
          label: '处理人员',
          align: 'center',
          sortable: true,
        },
        {
          prop: 'remark',
          label: '处理备注',
          align: 'center',
          sortable: true,
          showTooltip: true,
        },
      ], // 表头信息添加
      multipleSelection: [],
      /** Pagination 参数 */
      total: 0, // 数据总条数
      listQuery: {
        message: '',
         active: '1',
        msgTypeName: '',
        currentPage: 1, //  默认第一页
        pagesize: 10, //  每页10条数据
      },

      /** CommonForm 参数 */
      formItemList: formItemList,

      /** CommonButton 参数 */
      getRowData: '', // 存储行数据
      buttons: [
        {
          label: '处理',
          funcCode: 'lbcl',
          icon: 'el-icon-search',
          click: () => {
            let info = ''
            if (this.getRowData === '' || this.getRowData === null) {
              info = '请先选择记录!'
              handleAlert(info, 'warning')
            }
          },
        },
        {
          label: '刷新',
          isFun: false,
          icon: 'el-icon-loading',
          click: () => {
            this.fetchData()
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 处理查询事件
    submitHandler(e) {
      this.listQuery = objValueToObValue(this.listQuery, e)
      this.fetchData() // 请求数据
      // 获取查询条件的内容字符串
      console.log(e)
      const filtersRoleName = e.roleName
      const filtersRoleType = e.active
      // 筛选原始数组并赋值给filtersList数组
      const filtersList = this.initData.filter((item) => {
        // 定义筛选条件，默认为true，动态选择条件
        let isRoleName = true
        var isRoleType = true
        // 符合动态选择条件就给筛选条件赋值
        if (filtersRoleName.length !== '') {
          isRoleName = item.roleName.includes(filtersRoleName)
        }
        if (filtersRoleType.length !== '') {
          isRoleType = item.active === filtersRoleType
        }
        // 返回筛选条件
        return isRoleName && isRoleType
      })
      // 把筛选后的数组赋值给列表显示数组
      this.list = filtersList
      this.total = filtersList.length
    },
    // 表格初始化数据
    fetchData() {
      const newList = []
      newList.push({
        message: '服务器10.201.203.1 运行异常',
        createTime: '2020-08-25 14:54',
        msgTypeName: '1',
        status: '0',
        processTime: '1',
        processUserName: '1',
        remark: '1',
      })
      for (let i = 0; i < 20; i++) {
        newList.push({
          message: '服务器10.201.203.1 运行异常',
          createTime: '2020-08-25 14:54',
          msgTypeName: '1',
          status: '1',
          processTime: '2020-08-25 14:54',
          processUserName: 'admin',
          remark: '123456787080',
        })
      }
      this.list = newList
      this.initData = newList
      this.total = newList.length
      const newQuery = objectDeleteEmptyItem(this.listQuery)
      // getRoleList().then((response) => {
      //   this.list = response.data.rows;
      //   this.initData = response.data.rows;
      //   this.total = response.data.total;
      //   this.options.loading = false;
      // });
    },
    // 行数据获取
    handleCurrentChange(row) {
      this.getRowData = row
      console.log('点击行数据为：', row)
    },
    // 多行选中
    handleSelectionChange(row) {
      this.multipleSelection = row
    },
    // 全选
    getAllChecked(val) {
      const rows = val ? this.list : ''
      console.log(rows)
      this.$nextTick(() => {
        this.multipleSelection = rows
        if (rows) {
          rows.forEach((row) => {
            this.$refs.checkTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.checkTable.clearSelection()
        }
      })
    },
    // 反选
    getInvertChecked(val) {
      const newData = getArrDifference(this.list, this.multipleSelection)
      this.$refs.checkTable.clearSelection()
      newData.forEach((row) => {
        this.$refs.checkTable.toggleRowSelection(row)
      })
    },
  },
}

// 搜索框表单数据
const formItemList = [
  {
    prop: 'message',
    label: '输入查询:',
    placeholder: '消息内容',
  },
  {
    prop: 'active',
    label: '消息状态:',
    itemType: 'select',
    selected: '', // 默认选择
    options: [
      {
        value: '',
        label: '全部',
      },
      {
        value: '1',
        label: '已处理',
      },
      {
        value: '0',
        label: '未处理',
      },
    ],
  },
  {
    prop: 'msgTypeName',
    label: '消息分类:',
    itemType: 'select',
    selected: '', // 默认选择
    options: [
      {
        value: '',
        label: '全部',
      },
      {
        value: '1',
        label: '服务器异常',
      },
    ],
  },
]
</script>

<style scoped>
.el-button--mini,
.el-button--mini.is-round {
  padding: 5.5px 8px;
}
</style>

