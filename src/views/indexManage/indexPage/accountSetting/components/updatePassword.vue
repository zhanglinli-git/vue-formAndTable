<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-03 08:51:49
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-02-01 09:30:05
-->

<template>
  <div class="app-container">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix container-page-title"
        :style="{'background':theme.pageTitleBgColor,'color':theme.pageTitleTextColor}"
      >
        <el-row>
          <el-col :span="20">
            <span>修改密码</span>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <span>
              <font style="color:red;top: 3px;right:3px;position: relative;">*</font>为必填项
            </span>
          </el-col>
        </el-row>
      </div>

      <div class="container-page-main">
        <common-form
          ref="updatePasswordFormRef"
          :form-item-list="updatePasswordItemList"
          :item-width="300"
        />
        <span slot="footer" class="footer-button">
          <el-button icon="el-icon-collection" type="primary" :plain="true" @click="submitPswd">提交</el-button>
          <el-button
            icon="el-icon-refresh-right"
            @click="()=>{ this.$refs.updatePasswordFormRef.resetForm();}"
          >重 置</el-button>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { CommonForm } from '@/components'
import { mapGetters } from 'vuex'
import { editPwd } from '@/api/user'

export default {
  name: 'UpdatePassword',
  components: { CommonForm },
  data() {
    const validatePassWord = (rule, value, callback) => {
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~@#$%\*-\+=:,\\?\[\]\{}]).{8,20}$/
      if (!pattern.test(value)) {
        callback(
          new Error(
            '密码长度8位到20位，必须包含大小写字母、数字和特殊符号(!@#$%^&*)!'
          )
        )
      } else {
        callback()
      }
    }
    const updatePasswordItemList = [
      {
        prop: 'oldPswd',
        label: '原密码：',
        labelWidth: '140',
        rules: [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              value && value.length > 7 && value.length < 20
                ? callback()
                : callback(new Error('密码长度8位到20位!'))
            },
          },
        ],
        showPassword: true,
        placeholder: '原登录密码',
      },
      {
        prop: 'newPswd',
        label: '新密码：',
        labelWidth: '140',
        rules: [
          { required: true, trigger: 'change', validator: validatePassWord },
        ],
        showPassword: true,
        placeholder: '新的登录密码',
      },
      {
        prop: 'confirmPswd',
        label: '确认密码：',
        labelWidth: '140',
        rules: [
          { required: true, trigger: 'change', validator: validatePassWord },
        ],
        showPassword: true,
        placeholder: '确认新的密码',
      },
    ]

    return {
      updatePasswordItemList,
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  created() {
    this.userId = this.$route.query.userId
  },
  methods: {
    submitPswd() {
      let isSubmit = true
      const formData = this.$refs.updatePasswordFormRef.getFormData()
      if (!formData.oldPswd || !formData.newPswd || !formData.confirmPswd) {
        this.$Confirm.handleAlert('带 * 为必填项', 'warning')
        isSubmit = false
      }
      if (formData.newPswd !== formData.confirmPswd) {
        this.$Confirm.handleAlert('两次输入密码不一致', 'warning')
        isSubmit = false
      }
      const newValue = {
        userId: this.userId,
        oldPwd: formData.oldPswd,
        newPwd: formData.newPswd,
      }
      if (isSubmit) {
        editPwd(newValue).then((response) => {
          if (response.data.code === 200) {
            this.$Confirm.handleAlert('密码重置成功！', 'success')
            this.logout()
          } else {
            this.$Confirm.handleAlert(response.data.message, 'warning')
          }
        })
      }
    },
    logout() {
      this.$Confirm
        .handleConfirm('即将跳转登录界面', 'warning')
        .then(async () => {
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          // this.$router.push(`/login`)
        })
    },
  },
}
</script>

<style scoped>
.container-page-main .footer-button {
  position: relative;
  left: 150px;
}
</style>>
