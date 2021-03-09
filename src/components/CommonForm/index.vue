<!--
 * @Descripttion: 封装的表单
 * @Author: zhanglinli
 * @Date: 2020-07-21 14:08:15
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-09 16:14:49
-->
<template>
  <div v-if="formItem && formItem.length > 0">
    <el-form
      v-if="formItem && formItem.length > 0"
      ref="form"
      class="conmm-from"
      :model="formData"
      :label-position="labelPosition"
      :inline="inline"
      :style="formWidth && !isSearchArea
        ? `width: ${formWidth};min-width: ${formWidth};`
        : `width: ${detailFromWidth}px;`"
      :label-width="labelWidth ? (labelWidth + 'px') : ''"
      @submit.native.prevent="searchHandler()"
    >
      <template v-for="(item, index) in formItem">
        <el-form-item
          v-if="item.showItem === false ? false : true"
          :key="index"
          :class="item.isRedLabel ? 'redLabel' : ''"
          :prop="item.itemType != 'datetimerange' ? item.prop : (item.prop + index)"
          :label="item.isLabelHide?'':item.label"
          :rules="item.rules || []"
          :label-width="(item.labelWidth && isSearchArea && isHideItem) || (item.labelWidth && !isSearchArea)? (item.labelWidth + 'px') : (labelWidth + 'px')"
        >
          <div :class="item.isRedValue ? 'redValue' : ''">
            <!-- 单纯文本显示 -->
            <div
              v-if="item.itemType === 'pureLabel'"
              class="pureLabel"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
            >
              <div v-if="item.formatter">
                <div
                  :style="(item.itemWidth ? `width: ${item.itemWidth}px;` : `width: ${itemWidth}px;`)"
                  v-html="item.formatter(item.value || item.selected)"
                />
              </div>
              <div
                v-else
                :style="(item.itemWidth ? `width: ${item.itemWidth}px;` : `width: ${itemWidth}px;`)"
              >
                <el-tooltip
                  v-if="item.value && item.value.length>20"
                  class="item"
                  effect="dark"
                  :content="item.value"
                  placement="top-start"
                  max-width="400px"
                >
                  <span>
                    {{ item.value && item.value.length > 20 ? item.value.substring(0, 16) + '...' : item.value }}
                    <i
                      class="el-icon-thumb"
                    />
                  </span>
                </el-tooltip>
                <span v-else>{{ item.value || item.selected }}</span>
              </div>
            </div>

            <!-- 单纯文本显示(控件底部文字提示) -->
            <div
              v-if="item.itemType === 'underlineLabel'"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
              style="position:absolute;top:-35px;color:rgba(157,157,157);font-size:12px"
            >{{ item.value || item.selected }}</div>

            <!-- 默认输入框 -->
            <el-input
              v-if="item.itemType === 'input' || !item.itemType"
              v-model="formData[item.prop]"
              :size="item.size ? item.size : size"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              :placeholder="item.placeholder || item.label && `请输入${item.label.replace(/:/g, '')}` || ''"
              :value="item.value"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
              :show-password="item.showPassword ? item.showPassword : false"
              clearable
            >
              <template
                v-if="item.append && !item.disabled && !item.readonly"
                slot="append"
              >{{ item.append }}</template>
              <template v-if="item.disabled || item.readonly">
                <i slot="suffix" class="el-input__icon">{{ item.append }}</i>
              </template>
            </el-input>

            <!-- 默认数值输入框 -->
            <el-input-number
              v-if="item.itemType === 'inputNumber'"
              v-model="formData[item.prop]"
              :min="0"
              :size="item.size ? item.size : size"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              :placeholder="item.placeholder || item.label && `请输入${item.label.replace(/:/g, '')}` || ''"
              :value="item.value"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
              controls-position="right"
              clearable
            />

            <!-- 默认文本框 -->
            <el-input
              v-if="item.itemType === 'textarea'"
              v-model="formData[item.prop]"
              autosize
              type="textarea"
              :size="item.size ? item.size : size"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              :placeholder="item.placeholder || item.label && `请输入${item.label.replace(/:/g, '')}` || ''"
              :value="item.value"
              :maxlength="item.areaLength || 100"
              show-word-limit
              :style="!formWidth && !item.itemWidth
                ? `width: ${detailFromWidth-labelWidth-12}px;`
                : `width: ${item.itemWidth || itemWidth}px;`"
              clearable
            />

            <!-- 下拉框 -->
            <el-select
              v-else-if="item.itemType === 'select'"
              v-model="formData[item.prop]"
              :size="item.size ? item.size : size"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              :placeholder="item.placeholder || item.label && `请选择${item.label.replace(/:/g, '')}` || ''"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
              clearable
              @change="e => changeFun(e,item.prop,item.changeProp,item.changeShow)"
            >
              <el-option
                v-for="(option, optionIndex) in item.options"
                :key="optionIndex + '_local'"
                :value="(typeof option === 'object') ? option[item.valueKey || 'value'] : option"
                :label="(typeof option === 'object') ? option[item.labelKey || 'label'] : option"
              />
              <el-option
                v-for="(op, opIndex) in selectOptions[item.prop]"
                :key="opIndex + '_remote'"
                :value="(typeof op === 'object') ? op[item.valueKey || 'value'] : op"
                :label="(typeof op === 'object') ? op[item.labelKey || 'label'] : op"
              />
            </el-select>

            <!-- 自动检索下拉框 -->
            <el-select
              v-else-if="item.itemType === 'selectWithAuto'"
              v-model="formData[item.prop]"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              :size="item.size ? item.size : size"
              :placeholder="item.placeholder || item.label && `请选择${item.label.replace(/:/g, '')}` || ''"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
              clearable
              @keyup.enter.native="$event.target.focus"
              @focus="selectAutoResetOptions(item.prop)"
              @change="e => changeFun(e,item.prop,item.changeProp,item.changeShow)"
            >
              <div class="el-input" style="width:96%;margin-left:2%;">
                <el-input
                  v-model="selectAutoInputValue[item.prop]"
                  placeholder="支持中文/拼音首字母"
                  size="mini"
                  clearable
                  @input="selectAutoSearch(item.prop,item.labelKey)"
                  @change="selectAutoResetOptions(item.prop)"
                />
              </div>
              <template v-for="(op, opIndex) in selectOptions[item.prop]">
                <el-option
                  v-if="op[item.labelKey || 'label']"
                  :key="opIndex + '_remote'"
                  :value="(typeof op === 'object') ? op[item.valueKey || 'value'] : op"
                  :label="(typeof op === 'object') ? op[item.labelKey || 'label'] : op"
                />
              </template>

              <el-option
                v-if="selectOptions[item.prop]&&selectOptions[item.prop].length === 0"
                disabled
                value="暂无数据"
              />
            </el-select>

            <!-- 自动检索多选下拉框 -->
            <select-tree-auto
              v-else-if="item.itemType === 'selectTreeWithAuto'"
              ref="selectTreeWithAuto"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || item.label && `请选择${item.label.replace(/:/g, '')}` || ''"
              :size="item.size ? item.size : size"
              :props="item.treeProp"
              :keys="item.prop"
              :options="selectOptions[item.prop] ? selectOptions[item.prop] : item.treeData || item.options"
              :accordion="true"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              :show-checkbox="item.showCheckbox ? item.showCheckbox : false"
              :selected="item.selected ? item.selected : []"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
              clearable
              @getValue="changeFun($event,item.prop,item.changeProp,item.changeShow)"
            />

            <!-- 城市自动检索下拉框 -->
            <el-select
              v-else-if="item.itemType === 'selectCity'"
              v-model="formData[item.prop]"
              :size="item.size ? item.size : size"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              :placeholder="item.placeholder || item.label && `请选择${item.label.replace(/:/g, '')}` || ''"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
              clearable
              @keyup.enter.native="$event.target.focus"
              @focus="selectAutoResetOptions(item.prop)"
              @change="e => changeFun(e,item.prop,item.changeProp,item.changeShow)"
            >
              <div class="el-input" style="width:90%;margin-left:5%;">
                <el-input
                  v-model="selectAutoInputValue[item.prop]"
                  placeholder="支持中文/拼音首字母"
                  size="mini"
                  clearable
                  @input="selectAutoSearch(item.prop)"
                  @change="selectAutoResetOptions(item.prop)"
                />
              </div>
              <template v-for="(op, opIndex) in selectOptions[item.prop]">
                <el-option
                  v-if="op.name"
                  :key="opIndex + '_remote'"
                  :value="op.name"
                  :label="op.name"
                />
              </template>
              <el-option
                v-if="selectOptions[item.prop]&&selectOptions[item.prop].length === 0"
                disabled
                value="暂无数据"
              />
            </el-select>

            <!-- 日期范围选择器 -->
            <el-date-picker
              v-else-if="item.itemType === 'datetimerange'"
              ref="datetimerange"
              v-model="formData[item.prop]"
              type="datetimerange"
              :picker-options="item.pickerOptions || pickerOptions || {}"
              :disabled="item.disabled || item.readonly"
              :readonly="item.readonly"
              :size="item.size ? item.size : size"
              :placeholder="item.placeholder || item.label && `请选择${item.label.replace(/:/g, '')}` || ''"
              :style="itemStyle + (item.itemWidth && item.itemWidth > 399 ? `width: ${item.itemWidth}px;` : itemWidth)"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              clearable
              @change="date => changeDate(date, item.prop[0], item.prop[1])"
            />
            <!-- 日期选择器 -->
            <el-date-picker
              v-else-if="item.itemType === 'datePicker'"
              v-model="formData[item.prop]"
              type="date"
              :picker-options="item.pickerOption || pickerOption || {}"
              value-format="yyyy-MM-dd"
              :disabled="item.disabled || item.readonly"
              :readonly="item.readonly"
              :size="item.size ? item.size : size"
              :placeholder="item.placeholder || item.label && `请选择${item.label.replace(/:/g, '')}` || ''"
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '330')"
              clearable
              @change="date => changeDate(date, item.prop[0], item.prop[1])"
            />

            <!-- 单选框 -->
            <el-radio-group
              v-else-if="item.itemType == 'radio'"
              v-model="formData[item.prop]"
              :size="item.size ? item.size : size"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              clearable
              @change="e => changeFun(e,item.prop,item.changeProp,item.changeShow)"
            >
              <div :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')">
                <el-radio
                  v-for="(radio, radioIndex) in item.options"
                  :key="radioIndex"
                  :label="radio.value"
                >{{ radio.label }}</el-radio>
                <el-radio
                  v-for="(radio, radioIndex) in selectOptions[item.prop]"
                  :key="radioIndex"
                  :label="radio.value"
                >{{ radio.label }}</el-radio>
              </div>
            </el-radio-group>

            <!-- switch开关 -->
            <el-switch
              v-else-if="item.itemType == 'switch'"
              v-model="formData[item.prop]"
              :readonly="item.readonly"
              :disabled="item.disabled || item.readonly"
              active-icon-class="el-icon-check"
              active-color="#409EFF"
              inactive-icon-class="el-icon-close"
              inactive-color="grey"
              clearable
              :style="itemStyle + (item.itemWidth ? `width: ${item.itemWidth}px;` : '')"
              @change="e => changeFun(e,item.prop,item.changeProp,item.changeShow)"
            />

            <!-- 文件上传 -->
            <div v-else-if="item.itemType == 'upload'">
              <el-row type="flex" justify="space-between">
                <el-input
                  v-model="formData.file.uploadFileName"
                  :placeholder="item.placeholder || item.label && `请选择${item.label.replace(/:/g, '')}` || ''"
                  size="mini"
                  style="margin-right:5px;"
                  :style="item.itemWidth ? `width: ${item.itemWidth - 85}px;` : `width: ${itemWidth - 85}px;`"
                />
                <div>
                  <el-upload
                    ref="upload"
                    :action="''"
                    :limit="1"
                    :show-file-list="false"
                    :http-request="modeUpload"
                    :accept="item.accept"
                    :file-list="fileList"
                  >
                    <el-button size="mini" type="primary">选择文件</el-button>
                  </el-upload>
                </div>
              </el-row>
              <div
                style="font-size:12px;height: 30px;margin-top: -15px;"
              >支持文件格式：[{{ item.accept }}],单个文件不能超过50M</div>
            </div>
          </div>
        </el-form-item>
      </template>

      <el-form-item v-if="showSearchBtn || showResetBtn || isHide || showSlotBtn" label>
        <!-- 查询按钮 -->
        <el-button
          v-if="showSearchBtn"
          :style="{ marginBottom: '10px' }"
          type="primary"
          icon="el-icon-search"
          :size="size"
          :loading="submitLoading"
          @click="searchHandler"
        >查询</el-button>

        <!-- 重置按钮 -->
        <el-button
          v-if="showResetBtn"
          icon="el-icon-refresh-right"
          :plain="true"
          :size="size"
          @click="resetForm"
        >重置</el-button>

        <!-- 隐藏及更多 -->
        <template v-if="isHide">
          <el-button
            v-if="isHideItem === false"
            type="text"
            icon="el-icon-bottom"
            :size="size"
            @click="moreResult"
          >展开</el-button>
          <el-button v-else type="text" icon="el-icon-top" :size="size" @click="moreResult">隐藏</el-button>
        </template>
        <!-- 按钮插槽-->
        <slot name="btn" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { formProps } from './js/props'
import { searchChineseAndPinYin } from './js/searchChineseAndPinyin'
import { parseTime, isObjectValueEqual, getModified } from './js/public'
import SelectTreeAuto from './SelectTreeAuto/index'
import city from './js/city.json'
import elementResizeDetectorMaker from 'element-resize-detector'

export default {
  name: 'CommonForm',
  components: { SelectTreeAuto },
  props: formProps, // 表单组件包含属性
  data() {
    console.log('%c———————————————进入表单组件———————————————', 'color:red')
    const { formItemList } = this.$props // eslint-disable-line no-unused-vars
    const formItem = formItemList
    const initFormItem = JSON.parse(JSON.stringify(formItem))
    const dataObj = {
      selectOptions: {},
    }
    const formData = {}
    const oldSearchJobType = {}
    const selectAutoInputValue = {}
    const selectAutoShow = {}
    let isHide = false

    formItem?.length > 0 &&
      formItem.forEach((item, index) => {
        const propType = typeof item.prop
        if (item.special) {
          isHide = true
        }
        if (propType === 'string') {
          // 获取默认值,有传入，默认选中值为传入值，无传入为空
          const selected = item.selected || ''
          formData[item.prop] = selected
        }
        if (item.itemType === 'selectWithAuto') {
          selectAutoInputValue[item.prop] = ''
          selectAutoShow[item.prop] = []
        }
        if (item.itemType === 'selectWithAll') {
          const dataKey = item.prop
          oldSearchJobType[item.prop] = []
          if (item.options) {
            dataObj.selectOptions[dataKey] = JSON.parse(
              JSON.stringify(item.options)
            )
          }
        }
        if (item.itemType === 'selectCity') {
          const dataKey = item.prop
          selectAutoShow[dataKey] = JSON.parse(JSON.stringify(city))
          dataObj.selectOptions[dataKey] = JSON.parse(JSON.stringify(city))
        }
        if (item.selectFetch && !item.treeData) {
          const dataKey = item.prop
          dataObj.selectOptions[dataKey] = []
          this.getRemoteData({
            fetch: item.selectFetch,
            fetchParams: item.fetchParams,
            dataKey,
            resultField: item.selectResultField || 'data',
            resultHandler: item.selectResultHandler,
            selectType: item.itemType,
          })
        }
        if (item.itemType === 'oneSelect') {
          formItem.forEach((item2) => {
            if (item2.prop === item.changeProp) {
              if (item2.fetchType) {
                item2.itemType = item2.fetchType[item.selected]
              }
            }
          })
        }
      })
    return {
      oldSearchJobType, // 存储上一次数据
      pickerOption, // 日期快捷
      pickerOptions, // 日期范围快捷
      formData, // 表单数据
      ...dataObj, // 存储远程数据源
      selectAutoInputValue, // 存储检索数据
      selectAutoShow, // 检索后的option
      formItem, // 表单配置数组
      initFormItem, // 初始化表单配置
      isHideItem: false, // 展开 || 隐藏
      isHide, // 是否存在展开搜索
      detailFromWidth: '', // 详情表单宽度
      fileList: [], // 上传文件数组
      fileItem: {}, // 上传文件对象
      uploadFileName: '', // 上传文件名
      uploading: false, // 文件上传状态
    }
  },
  // 计算属性
  computed: {
    itemStyle() {
      const { itemWidth } = this
      if (itemWidth) {
        return `width: ${itemWidth}px;`
      }
      return ''
    },
  },
  // 初始化页面完成后，再对dom节点进行相关操作。
  mounted() {
    const _this = this
    const erd = elementResizeDetectorMaker()
    erd.listenTo(
      document.getElementsByClassName('container-page-main'),
      (element) => {
        _this.$nextTick(() => {
          // 监听到事件后执行的业务逻辑
          const totalWidth = element.offsetWidth - 40
          const fromWidth = this.labelWidth + this.itemWidth + 12
          if (totalWidth > fromWidth && totalWidth < fromWidth * 2) {
            this.detailFromWidth = fromWidth
          } else if (totalWidth > fromWidth * 2 && totalWidth < fromWidth * 3) {
            this.detailFromWidth = fromWidth * 2
          } else if (totalWidth > fromWidth * 3 && totalWidth < fromWidth * 4) {
            this.detailFromWidth = fromWidth * 3
          } else if (totalWidth > fromWidth * 4 && totalWidth < fromWidth * 5) {
            this.detailFromWidth = fromWidth * 4
          } else if (totalWidth > fromWidth * 5 && totalWidth < fromWidth * 6) {
            this.detailFromWidth = fromWidth * 5
          } else {
            return ''
          }
          if (this.showSlotBtn && totalWidth < 1400) {
            this.detailFromWidth = this.detailFromWidth + 150
          }
        })
      }
    )
  },
  methods: {
    // 查询
    searchHandler() {
      const { submitHandler } = this
      if (submitHandler) {
        submitHandler(this.formData)
      } else {
        throw new Error('找不到submitHandler函数!')
      }
      this.$emit('fromSearch', this.formData)
    },

    // 判断是否为数组
    isArray(value) {
      return (
        typeof value === 'object' &&
        Object.prototype.toString.call(value) === '[object Array]'
      )
    },

    // 表单重置方法
    resetForm() {
      this.formItem = JSON.parse(JSON.stringify(this.initFormItem))
      if (this.$refs['selectTreeWithAuto']) {
        this.$refs['selectTreeWithAuto'][0]?.reset()
      }
      this.$refs['form'].resetFields()
      this.formItem.forEach((item) => {
        if (item.itemType === 'datetimerange') {
          this.formData[item.prop[0]] = ''
          this.formData[item.prop[1]] = ''
          this.formData[item.prop] = ''
        }
      })
      // 隐藏更多重置
      this.isHideItem = false
    },

    // 查询栏隐藏/展开部分表单控件
    moreResult() {
      let flag = this.isHideItem
      this.isHideItem = !this.isHideItem
      if (flag) {
        flag = false
      } else {
        flag = true
      }
      this.formItem.forEach((item) => {
        if (item.special && item.special === true) {
          item.showItem = flag
        }
      })
    },
    hideItemHandle(flag) {
      this.formItem.forEach((item) => {
        if (item.special && item.special === true) {
          item.showItem = flag
        }
      })
    },

    // 对表单数据进行校验
    checkFrom() {
      let isTrue = true
      this.$refs.form.validate((valid) => {
        // 保存前验证处理
        if (!valid) {
          this.$Confirm.handleAlert('当前输入项有错误，请检查', 'error')
          isTrue = false
        } else {
          isTrue = true
        }
      })
      return isTrue
    },

    // 获取表单数据
    getFormData() {
      this.$emit('formData', this.formData)
      return this.formData
    },

    // 比较新旧值
    isChange() {
      return this.dealComparisonValue(isObjectValueEqual)
    },

    // 处理比较值
    dealComparisonValue(dealFunction, prop = 'prop') {
      const oldValue = {}
      const newValue = {}
      this.initFormItem.forEach((f) => {
        if (!f.ignoreChange) {
          let key = f[prop]
          if (key !== undefined && key !== null) {
            key = key.replace(':', '').replace('：', '')
          }
          if (!f.selected) {
            oldValue[key] = ''
          } else {
            oldValue[key] = f.selected
          }

          if (
            this.formData[f.prop] !== undefined &&
            this.formData[f.prop] !== null
          ) {
            newValue[key] = this.formData[f.prop]
          } else {
            newValue[key] = oldValue[key]
          }
        }
      })
      return dealFunction(oldValue, newValue)
    },

    // 日期改变事件
    changeDate(date, startDate, endDate) {
      if (date && (date[0] || date[1])) {
        const firstDate = date[0]
        const secondDate = date[1]
        this.formData[startDate] = parseTime(firstDate)
        this.formData[endDate] = parseTime(secondDate)
      } else {
        this.formData[startDate] = null
        this.formData[endDate] = null
      }
    },

    // 获取接口数据
    getRemoteData({
      fetch,
      fetchParams,
      dataKey,
      resultField,
      resultHandler,
      selectType,
    }) {
      fetch(fetchParams).then((response) => {
        let result = response
        if (typeof response === 'object' && !this.isArray(response)) {
          if (resultField.indexOf('.') !== -1) {
            resultField.split('.').forEach((value) => {
              result = result[value]
            })
          } else {
            result = response[resultField]
          }
        }

        if (!result || !(result instanceof Array)) {
          console.warn(
            `The result of key:${resultField} is not Array. 接口返回的字段:${resultField} 不是一个数组`
          )
        }

        if (resultHandler) {
          this.selectOptions[dataKey] = result.map(resultHandler)
        } else {
          this.selectOptions[dataKey] = JSON.parse(JSON.stringify(result))
          if (selectType === 'selectWithAuto') {
            this.selectAutoShow[dataKey] = JSON.parse(JSON.stringify(result))
          }
        }
      })
    },

    // 带自动下拉框——下拉框自动检索功能
    selectAutoSearch(prop, labelKey) {
      const value = this.selectAutoInputValue[prop]
      this.selectOptions[prop] = JSON.parse(
        JSON.stringify(
          searchChineseAndPinYin(this.selectAutoShow[prop], value, labelKey)
        )
      )
    },

    // 带自动下拉框——重置
    selectAutoResetOptions(prop) {
      this.selectAutoInputValue[prop] === ''
        ? (this.selectOptions[prop] = JSON.parse(
            JSON.stringify(this.selectAutoShow[prop])
          ))
        : ''
    },

    // change改变事件
    changeFun(value, prop, changeProp, changeShow) {
      /**
      处理级联导致的数据源改变
      changeProp: prop,
      **/
      if (changeProp) {
        const dataKey = changeProp
        this.formItem.forEach((item) => {
          if (item.prop === changeProp) {
            if (item.selectFetch) {
              item.fetchParams = { param: value }
              this.selectOptions[dataKey] = []
              this.getRemoteData({
                fetch: item.selectFetch,
                fetchParams: item.fetchParams,
                dataKey,
                resultField: item.selectResultField || 'data',
                resultHandler: item.selectResultHandler,
                selectType: item.itemType,
              })
            }
            this.formData[item.prop] = ''
            if (item.fetchType) {
              item.itemType = item.fetchType[value]
            }
          }
        })
        this.selectAutoResetOptions(changeProp)
      }
      /**
      处理级联导致的数据展示
      changeShow: {
        选择值: { 显示prop: [prop1, prop2], 隐藏prop: [prop1, prop2] },
      }
      **/
      if (changeShow) {
        const isTrueList = changeShow[value]?.isTrue
        const isFalseList = changeShow[value]?.isFalse
        this.formItem.forEach((item) => {
          isTrueList?.forEach((tItem) => {
            if (tItem === item.prop) {
              item.showItem = true
              // this.formData[item.prop] = ''
            }
          })
          isFalseList?.forEach((fItem) => {
            if (fItem === item.prop) {
              item.showItem = false
            }
          })
        })
      }
      this.formData[prop] = value
      this.$emit('oneSelect', value, prop)
    },

    // 上传文件封装
    getFileItem(item) {
      return item.file
    },

    // 文件上传
    modeUpload(item) {
      if (this.$refs.upload) {
        this.uploading = false
        // this.$nextTick(() => {
        //   this.$refs.upload.clearFiles() // 清除上传的文件
        // })
      }
      this.uploadFileName = ''
      this.fileItem = {}
      const file = item.file
      const size = file.size / 1024 / 1024
      if (size > 50) {
        this.$notify.warning({
          title: '警告',
          message: '大小必须小于50M',
        })
        return
      }
      this.fileItem = item.file // 获取要上传的文件
      this.uploadFileName = item.file.name
      this.uploading = true
      this.formData.file = {}
      this.formData.file.uploadFileName = this.uploadFileName
      this.formData.file.uploading = this.uploading
      this.formData.file.fileItem = this.fileItem
      this.$emit('upload', this.formData.file)
    },
  },
}

const pickerOptions = {
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      },
    },
  ],
}
const pickerOption = {
  disabledDate(time) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: '今天',
      onClick(picker) {
        picker.$emit('pick', new Date())
      },
    },
    {
      text: '昨天',
      onClick(picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        picker.$emit('pick', date)
      },
    },
    {
      text: '一周前',
      onClick(picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', date)
      },
    },
  ],
}
</script>

<style>
.el-form--inline .el-form-item {
  margin-bottom: 0px;
}

.container-page-main .el-form-item {
  margin-bottom: 15px;
}
.el-dialog .el-form-item {
  margin-bottom: 10px;
}
.el-form-item__error {
  padding: 0px !important;
  margin-top: -2px !important;
  font-size: 12px !important;
  transform: scale(0.9) !important;
}
.el-textarea__inner {
  min-height: 80px !important;
}
.el-upload__tip {
  margin-top: -20px !important;
}
div.el-upload-dragger {
  width: 300px !important;
}

.el-input__count {
  background: transparent !important ;
}
.el-upload-list {
  width: 300px !important;
}

.el-form-item__label {
  font-size: 12px !important;
}

.el-input-group__append,
.el-input-group__prepend {
  /* border: none !important; */
  /* background: none !important; */
  padding: 5px !important;
  width: 40px !important;
  text-align: center;
}

.redValue .el-input__inner {
  color: red !important;
}
.redLabel .el-form-item__label {
  color: red !important;
}
.redValue .el-textarea__inner {
  color: red !important;
}
.el-input.is-disabled .el-input__inner,
.el-textarea.is-disabled .el-textarea__inner {
  background-color: rgb(251 251 251) !important;
  color: #606266 !important;
  cursor: not-allowed !important;
}
.el-icon-circle-close {
  color: rgb(31, 152, 233) !important;
}
.is-disabled .el-input-group__append,
.el-input-group__prepend {
  background-color: rgb(251 251 251) !important;
  /* border-color: #fff !important; */
  color: #606266 !important;
  cursor: not-allowed !important;
}
.el-input__icon {
  font-style: normal !important;
}
.conmm-from .el-input__suffix-inner {
  /* color: #606266 !important; */
  /* margin-left: -200px !important; */
}
.pureLabel {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  background: rgb(251 251 251);
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  font-size: 13px;
}
.el-textarea__inner {
  margin-bottom: 3px !important;
}
</style>
