/*
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-07-21 14:08:15
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-01 16:40:17
 */

// common - form / >
// 详细属性prop文档：
// 1. size: 当前组件各个框和按钮的大小类型(全部) - String 可选: large, small, mini 默认值： 'small'
// 2. showResetBtn/showSearchBtn/showSlotBtn: 是否显示“ 重置/查询/插槽” 按钮 - Boolean 默认值： false
// 3. inline: 是否表单横向排列 - Boolean 默认值： false
// 4. labelWidth: 输入框前方label的宽度(全部) - Number
// 5. itemWidth: 输入框的宽度(全部) - Number
// 6. labelPosition: 表单对齐方式 - String 可选值为 top、left，当设为 top 时标签会置于表单域的顶部
// 7. submitHandler: 处理提交事件 - Function
// 8. submitLoading: 是否开启提交按钮的loading - Boolean 默认值： false
// 9. isSearchArea: 判断是否为搜索域 - Boolean  用于区分搜索域表单及普通表单
// 10. formItemList: 传入的表单配置 - Array

// "formItemList"
// 属性中各个输入框的配置文档:
// 1. label: 输入框前方label的文案 - String
// 2. prop: 发送表单时所属的字段 - [String, Array]
// 3. selected: 传入的默认值 - String
// 4. itemType: 该输入框为什么类型 - String 可选: input, select 默认值： 'input' 可选值:['input','select','oneSelect','datePicker','datetimerange','oneRadio','switch','upload','pureLabel','underlineLabel','inputNumber','textarea','selectWithAuto','selectCity','selectTreeWithAuto','radio']
// 5. size: 当前组件各个框和按钮的大小类型(单个) - String
// 6. placeholder: 输入框为空时提示语 - String 默认值： '请输入+输入框前方label的文案'
// 7. labelWidth: 输入框前方label的宽度(单个) - Number
// 8. itemWidth: 输入框的宽度(单个) - Number
// 9. disabled: 输入框禁用 - Boolean 默认值： false
// 10. readonly: 输入框只读 - Boolean 默认值： false
// 11. options: 写死select时候的下拉框选项 - Array
// 12. selectFetch: 远程数据的获取函数 - Function
// 13. selectResultField: 远程数据的最后一个获取字段名 - String
// 14. fetchParams: 远程接口数据的入参 - Object
// 15. changeShow: 级联控件——控件显示联动，一般与配置属性showItem搭配使用- String
// 16. showItem: 控件是否显示 - Boolean
// 17. changeProp: 级联控件——被联动远程数据改变联动 - Object
// 18. labelKey: select的label对应的字段,用于接口传回字段中文名,如channelName - String  默认值： 'label'
// 19. valueKey: select的value对应的字段,用于接口传回字段主键,如channelId - String  默认值： 'value'
// 20. rules: 当前输入框的校验规则 - Array 默认值：[]
// 21. areaLength: 文本框输入长度，搭配itemType为textarea使用 - String
// 22. showCheckbox: 是否为多选，搭配itemType为selectTreeWithAuto使用 - Boolean
// 23. accept:接收文件类型，搭配itemType为upload使用 - String
// 24. special:是否为高级搜索内容。搭配搜索域使用，添加自动增加展开更多搜索功能 - Boolean

// 详细属性prop文档：
const prop = {
  size: {
    type: String,
    default: 'small',
  },
  showResetBtn: Boolean,
  showSearchBtn: Boolean,
  showSlotBtn: Boolean,
  inline: Boolean,
  formWidth: String,
  labelWidth: Number,
  itemWidth: Number,
  labelPosition: String,
  submitHandler: Function,
  submitLoading: Boolean,
  isSearchArea: Boolean,
}

// 属性中各个输入框的配置文档:
const formItemList = {
  type: Array,
  label: String,
  prop: [String, Array],
  selected: [String, Array],
  itemType: String,
  size: String,
  placeholder: String,
  labelWidth: Number,
  itemWidth: Number,
  disabled: Boolean,
  readonly: Boolean,
  options: Array,
  selectFetch: Function,
  selectResultField: String,
  fetchParams: Object,
  changeShow: String,
  showItem: Boolean,
  changeProp: Object,
  valueKey: String,
  labelKey: String,
  rules: Array, areaLength: Number,
  showCheckbox: Boolean,
  accept: String,
  special: Boolean
}

export const formProps = {
  // 由父组件传入属性
  ...prop,
  // 10. formItemList: 传入的表单配置 - Array
  formItemList,
}
