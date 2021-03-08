<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-07-30 13:54:50
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-02-25 17:16:39
-->
<template>
  <el-select
    v-model="valueTitle"
    size="small"
    :style="styles"
    :disabled="disabled"
    clearable
    :placeholder="placeholder"
  >
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      size="mini"
      clearable
      style="padding:0px 10px"
    />
    <el-checkbox
      v-if="showCheckbox && !isTree"
      v-model="checked"
      style="margin:3px 15px"
      @change="getAllChange"
    >全选</el-checkbox>

    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTreeAuto"
        :accordion="accordion"
        :data="option"
        :props="props"
        :show-checkbox="showCheckbox"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        :default-checked-keys="defaultCheckedKeys"
        :filter-node-method="filterNode"
        @check-change="handleCheckChange"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectTreeAuto',
  props: {
    // 配置项
    props: {
      type: Object,
      default: () => {
        return {
          value: 'value', // ID字段名
          label: 'label', // 显示名称
          children: 'children', // 子级字段名
        }
      },
    },

    // 选项列表数据
    options: { type: Array, default: () => [] },
    // 自动收起
    accordion: { type: Boolean, default: true },
    showCheckbox: { type: Boolean, default: true },
    // 样式
    styles: {
      type: String,
      default: '',
    },
    // 初始值
    selected: { type: Array, default: () => [] },
    // 是否禁用
    disabled: { type: Boolean, default: false },
    // 提示语句
    placeholder: { type: String, default: '' },
  },
  data() {
    return {
      valueId: [],
      label: '',
      id: '',
      filterText: '',
      valueTitle: '',
      defaultExpandedKey: [],
      defaultCheckedKeys: [],
      option: [],
      checked: false,
      isTree: false,
    }
  },
  watch: {
    filterText(val) {
      this.$refs.selectTreeAuto.filter(val)
    },
    valueTitle(val) {
      if (val === '') {
        this.valueId = []
        this.clearSelected()
        if (this.showCheckbox) {
          this.clearSelected()
          this.$emit('getValue', Array.from(new Set([])))
        } else {
          this.clearSelected()
          this.$emit('getValue', null)
        }
      }
    },
    options: {
      handler: function () {
        this.option = this.options
        this.isTree = this.options[0]?.children?.length > 0
        this.initHandle()
      },
      immediate: true,
    },
  },
  mounted() {
    this.valueId = this.selected
    this.label = this.props.label
    this.id = this.props.value
    this.option = this.options
    this.initHandle()
  },
  methods: {
    getAllChange(e) {
      if (e) {
        this.valueId = this.option.map((item) => {
          return item.value
        })
        this.defaultCheckedKeys = this.option.map((item) => {
          return item.value
        })
        const nextTitle = []
        this.$nextTick(() => {
          this.valueId.forEach((item) => {
            nextTitle.push(
              this.$refs.selectTreeAuto?.getNode(item)?.data[this.props.label]
            ) // 初始化显示
            this.defaultExpandedKey = [item] // 设置默认展开
          })
          // this.$refs.selectTreeAuto.setCheckedNodes(this.options)
          this.valueTitle = Array.from(new Set(nextTitle)).toString()
        })
      } else {
        this.valueId = []
        this.clearSelected()
        this.clearSelected()
        this.$emit('getValue', Array.from(new Set([])))
      }
    },
    handleCheckChange(data) {
      const nextTitle = []
      const nextId = []
      this.$refs.selectTreeAuto.getCheckedNodes().forEach((item) => {
        nextTitle.push(item[this.label])
        nextId.push(item[this.id])
      })
      this.$emit('getValue', Array.from(new Set(nextId)))
      this.valueTitle = Array.from(new Set(nextTitle)).toString()
    },
    filterNode(value, data) {
      return data[this.label].indexOf(value) !== -1
    },
    // 节点点击
    handleNodeClick(node) {
      if (!this.showCheckbox) {
        this.valueTitle = node[this.props.label]
        this.valueId = node[this.props.value]
        this.$emit('getValue', this.valueId)
        this.defaultExpandedKey = []
      }
    },
    // 重置子组件
    reset() {
      this.valueId = []
      this.valueTitle = ''
      this.$emit('reset', this.valueId, this.valueTitle)
    },
    // 初始化值
    initHandle() {
      if (this.valueId) {
        const nextTitle = []
        this.$nextTick(() => {
          this.valueId.forEach((item) => {
            nextTitle.push(
              this.$refs.selectTreeAuto?.getNode(item)?.data[this.props.label]
            ) // 初始化显示
            this.defaultExpandedKey = [item] // 设置默认展开
            this.defaultCheckedKeys.push(item)
          })
          if (this.valueId.length === 1) {
            this.valueId.forEach((item) => {
              this.$refs.selectTreeAuto.setCurrentKey(item) // 设置默认选中
            })
          }
          this.valueTitle = Array.from(new Set(nextTitle)).toString()
        })
      } else {
        if (this.valueTitle) {
          this.$nextTick(() => {
            this.valueTitle = ''
            this.clearSelected()
          })
        }
      }
      this.initScroll()
      this.$emit('treeSelect', this.valueTitle)
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        const scrollBar = document.querySelectorAll(
          '.el-scrollbar .el-scrollbar__bar'
        )
        scrollBar.forEach((ele) => (ele.style.width = 0))
      })
    },

    // 清空选中样式
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
      this.$refs.selectTreeAuto.setCheckedKeys([])
    },
  },
}
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  /* color: #606266; */
  font-weight: normal;
}
</style>
