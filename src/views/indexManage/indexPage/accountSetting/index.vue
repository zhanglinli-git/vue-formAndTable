<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-01 14:03:22
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-02-02 15:26:16
-->

<template>
  <div>
    <info-line />
    <div class="app-container-details">
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <div class="container-page-main">
            <div class="main-item">
              <el-card class="box-card">
                <div slot="header" class="clearfix container-page-title">
                  <el-row class="item-title" type="flex" justify="space-between">
                    <i class="el-icon-tickets" style="padding: 10px;">基本信息</i>
                    <span style="padding-right: 10px">
                      <el-button
                        v-if="buttonFlag === true"
                        size="mini"
                        icon="el-icon-s-operation"
                        type="primary"
                        style="margin-right:10px"
                        @click="editInformation('edit')"
                      >修改信息</el-button>
                      <el-button
                        v-else
                        size="mini"
                        type="primary"
                        @click="editInformation('save')"
                      >保存修改</el-button>
                      <el-button style="margin: 0 15px" type="text" @click="updatePassWord">修改密码</el-button>
                    </span>
                  </el-row>
                </div>
                <div class="main_content">
                  <el-row type="flex" justify="center">
                    <common-form
                      ref="checkFormRef"
                      :key="timer"
                      v-loading="detailLoading"
                      :inline="true"
                      :form-item-list="detailItemList"
                      :item-width="200"
                      :label-width="135"
                      label-position="right"
                    />
                  </el-row>
                </div>
              </el-card>
            </div>
            <div class="main-item">
              <el-card class="box-card">
                <div slot="header" class="clearfix container-page-title">
                  <el-row class="item-title" type="flex" justify="space-between">
                    <i class="el-icon-tickets" style="padding: 10px;">登陆日志</i>
                  </el-row>
                </div>
                <login-logs />
              </el-card>
            </div>
            <div class="main-item">
              <el-card class="box-card">
                <div slot="header" class="clearfix container-page-title">
                  <el-row class="item-title" type="flex" justify="space-between">
                    <i class="el-icon-tickets" style="padding: 10px;">历史记录</i>
                  </el-row>
                </div>
                <div class="main_content">
                  <common-table
                    v-loading="historyLoading"
                    :list="historyList"
                    max-height="280px"
                    :table-index="false"
                    :columns="historyColumns"
                  />
                  <el-row type="flex" justify="space-between" class="page-bottom">
                    <el-col :span="12" class="left"></el-col>
                    <el-col :span="12">
                      <!-- 分页组件 -->
                      <pagination
                        :total="historyTotal"
                        :page.sync="historyQuery.page"
                        :limit.sync="historyQuery.pageSize"
                        @pagination="getHistoryList"
                      />
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { CommonForm, CommonTable, Pagination } from '@/components'
import LoginLogs from './components/loginLogs'
import { mapGetters } from 'vuex'
import * as validate from '@/utils/validates'
import {
  getUserHistorical,
  getUserDetail,
  editUser,
} from '@/api/system-api/userEdit'
import { parseTime } from '@/utils'
import { InfoLine } from '@/components'
export default {
  name: 'UserDetail',
  components: {
    CommonForm,
    CommonTable,
    LoginLogs,
    Pagination,
    InfoLine,
  },
  data() {
    return {
      loginTime: '', // 用户登录时间
      buttonFlag: true, // true为阅读模式,false为编辑模式
      userId: null,
      list: [],
      // 基本信息
      detailItemList: [],
      detailList: [],
      detailLoading: true,
      historyTotal: 0,
      historyQuery: {
        page: 1, //  默认第一页
        pageSize: 10, //  每页10条数据
        userId: -1,
      },
      // 历史记录
      historyList: [],
      historyColumns: historyColumns,
      historyLoading: true,
      editData: {
        userName: '',
        phone: '',
        email: '',
        remark: '',
      },
      timer: '',
      activeNames: ['1'],
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  watch: {
    detailItemList: {
      // 深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.timer = new Date().getTime()
      },
      deep: true,
    },
  },
  created() {
    const loginTime = sessionStorage.getItem('loginTime')
    if (loginTime) {
      this.loginTime = parseTime(loginTime)
    }
    this.getHistoryList()
    this.getDetailList()
  },
  methods: {
    updatePassWord() {
      this.$router.push({
        name: 'UpdatePassword',
        query: { userId: this.userId },
      })
    },
    // 修改个人信息
    editInformation(type = 'edit') {
      this.buttonFlag = !this.buttonFlag
      if (type === 'edit') {
        // 如果点击了编辑按钮
        this.getDetailFromList_editingMode()
      } else {
        // 如果点击了保存按钮
        // this.getDetailFromList()
        const isSubmit = this.$refs.checkFormRef.checkFrom()
        const fromData = this.$refs.checkFormRef.getFormData()
        if (isSubmit) {
          this.editData = {
            userName: fromData.userName,
            phone: fromData.phone,
            email: fromData.email,
            remark: fromData.remark,
          }
          editUser(this.editData, this.userId).then((response) => {
            if (response.data.code === 200) {
              this.getDetailList()
              this.$Confirm.handleAlert('保存成功', 'success')
            }
          })
        } else {
          this.buttonFlag = !this.buttonFlag
        }
      }
    },
    // 获取用户历史记录
    getHistoryList() {
      // 与后端约定，-1为当前用户id
      getUserHistorical(this.historyQuery).then((response) => {
        this.historyList = response.data.data
        this.historyTotal = response.data.total
        this.historyLoading = false
      })
    },
    // 获取用户详情信息
    getDetailList() {
      getUserDetail().then((response) => {
        this.detailList = response.data.data[0]
        this.userId = this.detailList.userId
        this.getDetailFromList()
        this.detailLoading = false
      })
    },
    // 获取详情表单数据(修改编辑模式)
    getDetailFromList_editingMode() {
      this.detailItemList = [
        {
          prop: 'userName',
          label: '用户名：',
          selected: this.detailList.userName,
          rules: [
            {
              required: true,
              trigger: 'change',
              validator: (rule, value, callback) => {
                value.length === 0
                  ? callback(new Error('请输入用户姓名 限制10字符!'))
                  : value.length > 10
                  ? callback(new Error('限制输入10字符!'))
                  : callback() // 添加成功回调
              },
            },
          ],
          readonly: false,
        },
        {
          prop: 'loginName',
          label: '登录名：',
          value: this.detailList.loginName,
          itemType: 'pureLabel',
        },
        {
          prop: 'phone',
          label: '手机号：',
          selected: this.detailList.phone,
          rules: [
            {
              required: true,
              trigger: 'change',
              validator: validate.validateMobilePhone,
            },
          ],
          readonly: false,
        },
        {
          prop: 'email',
          label: 'Email：',
          selected: this.detailList.email,
          rules: [
            {
              required: true,
              trigger: 'change',
              validator: validate.validateEmail,
            },
          ],
          readonly: false,
        },
        {
          prop: 'roles',
          label: '所属角色：',
          // selected: getRoleList(this.detailList.roleList),
          value: this.detailList.roles,
          itemType: 'pureLabel',
        },
        {
          prop: 'deptName',
          label: '所属机构：',
          value: this.detailList.deptName,
          itemType: 'pureLabel',
        },
        {
          prop: 'remark',
          label: '备注：',
          selected: this.detailList.remark,
          readonly: false,
        },
        {
          prop: 'pwd_Modify_Time',
          label: '最近密码修改时间：',
          value: this.detailList.pwdModifyTime,
          itemType: 'pureLabel',
        },
        {
          prop: 'lastLoginTime',
          label: '用户登录时间：',
          itemType: 'pureLabel',
          value: this.detailList.lastLoginTime,
        },
      ]
    },
    // 获取详情表单数据(查看阅读模式)
    getDetailFromList() {
      this.detailItemList = [
        {
          prop: 'userName',
          label: '用户名：',
          itemType: 'pureLabel',
          value: this.detailList.userName,
        },
        {
          prop: 'loginName',
          label: '登录名：',
          itemType: 'pureLabel',
          value: this.detailList.loginName,
        },
        {
          prop: 'phone',
          label: '手机号：',
          itemType: 'pureLabel',
          value: this.detailList.phone,
        },
        {
          prop: 'email',
          label: 'Email：',
          itemType: 'pureLabel',
          value: this.detailList.email,
        },
        {
          prop: 'roles',
          label: '所属角色：',
          itemType: 'pureLabel',
          // selected: getRoleList(this.detailList.roleList),
          value: this.detailList.roles,
        },
        {
          prop: 'deptName',
          label: '所属机构：',
          itemType: 'pureLabel',
          value: this.detailList.deptName,
        },
        {
          prop: 'remark',
          label: '备注：',
          itemType: 'pureLabel',
          value: this.detailList.remark,
        },
        {
          prop: 'pwd_Modify_Time',
          label: '最近密码修改时间：',
          itemType: 'pureLabel',
          value: this.detailList.pwdModifyTime,
        },
        {
          prop: 'lastLoginTime',
          label: '用户登录时间：',
          itemType: 'pureLabel',
          value: this.detailList.lastLoginTime,
        },
      ]
    },
  },
}
// 历史记录表头
const historyColumns = [
  {
    prop: 'objectName',
    label: '操作模块',
    align: 'center',
  },
  {
    prop: 'userName',
    label: '操作人',
    align: 'center',
  },
  {
    prop: 'createTime',
    label: '操作时间',
    align: 'center',
  },
  {
    prop: 'operationType',
    label: '操作类型',
    align: 'center',
  },
  {
    prop: 'operationComment',
    label: '权限值',
    align: 'center',
    showDataLength: 20,
    showTooltip: true,
    width: 450,
  },
]
</script>
