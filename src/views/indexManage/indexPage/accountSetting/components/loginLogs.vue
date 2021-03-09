<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:03:22
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-11-23 11:05:46
-->
<template>
  <div>
    <div class="container-page-main">
      <!-- 表格组件 -->
      <common-table
        max-height="800px"
        :table-index="false"
        :list="list"
        :columns="columns"
        @handleCurrentChange="handleCurrentChange"
      />

      <!-- 分页组件 -->
      <pagination
        :total="total"
        :page.sync="listQuery.currentPage"
        :limit.sync="listQuery.pagesize"
        @pagination="fetchData"
      />
    </div>
  </div>
</template>

<script>
import { Pagination, CommonTable } from '@/components'
import { mapGetters } from 'vuex'
import {getLoginLogs} from "@/api/user";


export default {
  name: 'LoginLogs',
  components: { Pagination, CommonTable },
  data() {
    return {
      /** CommonTable 参数 */
      list: [], // 表格数据
      initData: [], // 初始化数据
      columns: columns, // 表头信息添加

      /** Pagination 参数 */
      total: 0, // 数据总条数
      listQuery: {
        currentPage: 1, //  默认第一页
        pagesize: 10, //  每页10条数据
      }
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 表格初始化数据
    fetchData() {

      // const newList = []
      // for (let i = 0; i < 20; i++) {
      //   newList.push({
      //     date: '2020-07-03 14:36:21',
      //     ip: i + 183 + '.14.135.1',
      //     area: '广东省深圳市',
      //     browser: 'Firefox 45',
      //   })
      // }
      // this.list = newList
      // this.initData = newList
      // this.total = newList.length
      //
      const params = {
        page: this.listQuery.currentPage,
        pageSize: this.listQuery.pagesize,
      }
      getLoginLogs(params).then((response) => {
        this.list = response.data.data
        this.initData = response.data.data
        this.total = response.data.total
      })

      // getRoleList().then((response) => {
      //   this.list = response.data.rows;
      //   this.initData = response.data.rows;
      //   this.total = response.data.total;
      //   this.options.loading = false;
      // });
    },
    // 选中行
    handleSelectionChange(row) {
      console.log('所勾选的行数据:', row)
    },
    // 行数据获取
    handleCurrentChange(row) {
      this.getRowData = row
      console.log('点击行数据为：', row)
    },
  },
}

// 表头数据
const columns = [
  {
    prop: 'createTime',
    label: '时间',
    align: 'center',
    // sortable: true,
  },
  {
    prop: 'ip',
    label: 'IP',
    align: 'center',
    // sortable: true,
  },
  {
    prop: 'address',
    label: '地区',
    align: 'center',
    // sortable: true,
  },
  {
    prop: 'browser',
    label: '浏览器',
    align: 'center',
    // sortable: true,
  },
]
</script>

