<!--
 * @Descripttion: 该页面用于——表单控件封装组件使用
 * @Author: zhanglinli
 * @Date: 2021-02-24 15:23:14
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-10 17:30:26
-->
<template>
  <div style="margin:0px 50px">
    <el-card>
      <h3>表单控件使用</h3>
      <common-form
        ref="detailFormRef"
        :inline="true"
        :form-item-list="fromItemList"
        :item-width="350"
        :label-width="200"
      />
    </el-card>

    <el-row type="flex" justify="between" class="use">
      <el-card>
        <h3>表单常用方法：一般用于新增修改的表单</h3>
        <div>
          表单数据是否变化:
          <div style="font-weight:bold">this.$refs.detailFormRef.isChange()</div>
        </div>
        <div>
          表单数据校验是否成功:
          <div style="font-weight:bold">this.$refs.detailFormRef.checkFrom()</div>
        </div>
        <div>
          表单数据获取:
          <div style="font-weight:bold">this.$refs.detailFormRef.getFormData()</div>
        </div>
        <div>
          表单数据重置(包含逻辑重置):
          <div style="font-weight:bold">this.$refs.detailFormRef.resetForm()</div>
        </div>
      </el-card>
      <el-card>
        <h3>表单内控件联动-远程数据联动：</h3>如物料类型、物料名称
        <common-form ref="onefromRef" :form-item-list="from1" :item-width="200" :label-width="80" />
      </el-card>
      <el-card>
        <h3>表单内控件联动-显示联动:</h3>如权限类型、权限值
        <common-form ref="twofromRef" :form-item-list="from2" :item-width="230" :label-width="80" />
      </el-card>
      <el-card>
        <h3>
          表单常用配置属性：一般用于搜索表单
          <p style="color:red">special: true, // 是否为高级搜索内容。搭配搜索域使用，自动增加展开更多搜索功能 - Boolean</p>
        </h3>
        <common-form ref="detailFormRef" :form-item-list="from3" :item-width="180" :inline="true" />
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { CommonForm } from '@/components'
import { f1, f2, f3, f31 } from './index'

export default {
  components: {
    CommonForm,
  },
  data() {
    return {
      fromItemList: [],
      from1: [],
      from2: [],
      from3: [],
    }
  },
  created() {
    this.fromItemList = [
      // 单纯文本显示
      {
        itemType: 'pureLabel', // 控件类型
        prop: 'pureLabel', // 发送表单时值对应key值
        label: '单纯文本显示:', // label文案
        selected: '单纯文本显示', // 默认值
      },
      // // 单纯文本显示(控件底部文字提示)
      // {
      //   itemType: 'underlineLabel', // 控件类型
      //   selected: '单纯文本显示(控件底部文字提示)', // 默认值
      // },
      // 默认输入框
      {
        itemType: 'input', // 控件类型
        prop: 'input', // 发送表单时值对应key值
        label: '默认输入框:', // label文案
      },
      // 默认数值输入框
      {
        itemType: 'inputNumber', // 控件类型
        prop: 'inputNumber', // 发送表单时值对应key值
        label: '默认数值输入框:', // label文案
      },
      // 本地下拉框
      {
        itemType: 'select', // 控件类型
        prop: 'select', // 发送表单时值对应key值
        label: '本地下拉:', // label文案
        options: [
          {
            value: '1',
            label: '已处理',
          },
          {
            value: '0',
            label: '未处理',
          },
        ], // 本地写死下拉框数据
      },
      // 远程下拉框
      {
        itemType: 'select', // 控件类型
        prop: 'selectFetch', // 发送表单时值对应key值
        label: '远程下拉:', // label文案
        selectFetch: f1, // 远程接口名
        selectResultField: 'data', // 接口最后获取变量参数名
      },
      // 自动检索下拉框
      {
        itemType: 'selectWithAuto', // 控件类型
        prop: 'selectWithAuto', // 发送表单时值对应key值
        label: '自动检索下拉框:', // label文案
        selectFetch: f1, // 远程接口名
        selectResultField: 'data', // 接口最后获取变量参数名
      },
      // 城市自动检索下拉框
      {
        itemType: 'selectCity', // 控件类型
        prop: 'selectCity', // 发送表单时值对应key值
        label: '城市自动检索下拉框:', // label文案
      },
      // 树形选择器
      {
        itemType: 'selectTreeWithAuto', // 控件类型
        prop: 'selectTreeWithAuto1', // 发送表单时值对应key值
        label: '树形选择器:', // label文案
        selectFetch: f2, // 远程接口名
        selectResultField: 'data', // 接口最后获取变量参数名
        treeProp: {
          // 配置项（必选）和element配置项一致
          value: 'deptId',
          label: 'deptName',
          children: 'children',
        },
      },
      // 普通多选择器
      {
        itemType: 'selectTreeWithAuto', // 控件类型
        prop: 'selectTreeWithAuto2', // 发送表单时值对应key值
        label: '普通多选择器:', // label文案
        selectFetch: f1, // 远程接口名
        selectResultField: 'data', // 接口最后获取变量参数名
        showCheckbox: true, // 是否为多选
      },
      // 树形多选择器
      {
        itemType: 'selectTreeWithAuto', // 控件类型
        prop: 'selectTreeWithAuto3', // 发送表单时值对应key值
        label: '树形多选择器:', // label文案
        selectFetch: f2, // 远程接口名
        selectResultField: 'data', // 接口最后获取变量参数名
        treeProp: {
          // 配置项（必选）和element配置项一致
          value: 'deptId',
          label: 'deptName',
          children: 'children',
        },
        showCheckbox: true, // 是否为多选
      },
      // 单选框
      {
        itemType: 'radio', // 控件类型
        prop: 'radio', // 发送表单时值对应key值
        label: '单选框:', // label文案
        selectFetch: f1, // 远程接口名
        selectResultField: 'data', // 接口最后获取变量参数名
      },
      // switch开关
      {
        itemType: 'switch', // 控件类型
        prop: 'switch', // 发送表单时值对应key值
        label: 'switch开关:', // label文案
        selected: true, // 默认值
      },
      // 文件上传
      {
        itemType: 'upload', // 控件类型
        prop: 'file', // 发送表单时值对应key值
        label: '文件上传:', // label文案
        accept: '.zip, .rar', // 接受文件类型
      },
      // 日期范围选择器
      {
        itemType: 'datetimerange', // 控件类型
        prop: ['beginTime', 'endTime'], // 发送表单时值对应key值,日期范围选择为数组
        label: '日期范围选择器:', // label文案
        itemWidth: 300, // item宽度
      },
      // 日期选择器
      {
        itemType: 'datePicker', // 控件类型
        prop: 'time', // 发送表单时值对应key值
        label: '日期选择器:', // label文案
      },
      // 默认文本框
      {
        itemType: 'textarea', // 控件类型
        prop: 'textarea', // 发送表单时值对应key值
        label: '默认文本框:', // label文案
        itemWidth: 350, // item宽度
      },
    ]
    this.from1 = [
      {
        itemType: 'selectWithAuto',
        prop: 'materialTypeId',
        label: '物料类型:',
        labelKey: 'typeName', // select的label对应的字段
        valueKey: 'materialTypeId', // valueKey: select的value对应的字段
        selectFetch: f3, // 远程数据的获取函数
        selectResultField: 'result', // selectResultField: 远程数据的最后一个获取字段名
        changeProp: 'matterName', // changeProp: 级联控件——被联动远程数据改变联动
      },
      {
        itemType: 'select',
        prop: 'matterName',
        label: '物料:',
        labelKey: 'materialName', // select的label对应的字段
        valueKey: 'materialCode', // valueKey: select的value对应的字段
        selectFetch: f31, // 远程数据的获取函数
        fetchParams: { param: '' }, // 远程接口数据的入参
      },
    ]
    this.from2 = [
      {
        prop: 'propertyType',
        label: '权限类型：',
        itemType: 'radio',
        selected: 'deptId',
        options: [
          { label: '机构', value: 'deptId' },
          { label: '渠道', value: 'channelId' },
          { label: '打印点', value: 'centerId' },
        ],
        //  changeShow: 级联控件——控件显示联动，一般与配置属性showItem搭配使用
        changeShow: {
          deptId: {
            isTrue: ['deptId'],
            isFalse: ['channelId', 'centerId'],
          },
          channelId: {
            isTrue: ['channelId'],
            isFalse: ['deptId', 'centerId'],
          },
          centerId: {
            isTrue: ['centerId'],
            isFalse: ['deptId', 'channelId'],
          },
          '': {
            isFalse: ['centerId', 'deptId', 'channelId'],
          },
        },
      },
      {
        prop: 'propertyType',
        label: '权限类型：',
        itemType: 'select',
        selected: 'deptId',
        options: [
          { label: '机构', value: 'deptId' },
          { label: '渠道', value: 'channelId' },
          { label: '打印点', value: 'centerId' },
        ],
        //  changeShow: 级联控件——控件显示联动，一般与配置属性showItem搭配使用
        changeShow: {
          deptId: {
            isTrue: ['deptId'],
            isFalse: ['channelId', 'centerId'],
          },
          channelId: {
            isTrue: ['channelId'],
            isFalse: ['deptId', 'centerId'],
          },
          centerId: {
            isTrue: ['centerId'],
            isFalse: ['deptId', 'channelId'],
          },
          '': {
            isFalse: ['centerId', 'deptId', 'channelId'],
          },
        },
      },
      {
        prop: 'deptId',
        label: '权限值:',
        placeholder: '请选择机构',
      },
      {
        prop: 'channelId',
        label: '权限值:',
        placeholder: '请选择渠道',
        showItem: false,
      },
      {
        prop: 'centerId',
        label: '权限值:',
        placeholder: '请选择打印点',
        showItem: false,
      },
    ]
    this.from3 = [
      {
        prop: 'default',
        label: '默认控件:',
        selected: '默认控件',
      },
      {
        prop: 'more',
        label: '展开控件:',
        selected: '展开控件',
        special: true, // 是否为高级搜索内容。搭配搜索域使用，添加自动增加展开更多搜索功能 - Boolean
        showItem: false, // 默认控件不显示
      },
    ]
  },
}
</script>
<style scoped>
.use .el-card {
  margin-right: 30px;
  min-width: 380px !important;
  max-width: 500px !important;
}
div {
  margin: 20px 0px;
}
</style>
