<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-03-04 10:46:37
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-05 14:10:27
-->
<template>
  <div>
    <h2>
      表格使用:属性与element框架table使用一致,
      <a
        @click="toLint"
      >https://element.faas.ele.me/#/zh-CN/component/table</a>
    </h2>
    <div class="item">
      基础属性:
      <p>row-keys:普通表格行key值</p>
      <p>rowTreeKeys:树形表格行key值</p>
      <p>columns:表头</p>
      <p>list:表数据</p>
    </div>
    <div class="item">
      表配置属性:
      <p>muti-select:添加选择框</p>
      <p>is-show-tool:是否显示列设置</p>
      <p>expend-detail:是否使用详情插槽,搭配插槽使用</p>
      <p>
        table-index:添加序号， limit/page:序号计算所需,搭配分页使用(:limit.sync="listQuery.pageSize :page.sync="listQuery.page"
        ")
      </p>

      <br />
      <p>operates:列设置,即操作列按钮组</p>operates属性配置
      <div class="desc">
        label: 文本，
        <br />type :类型（primary / success / warning / danger / info / text）
        <br />show：是否显示
        <br />code：权限代码
        <br />color：按钮字体颜色
        <br />icon：按钮图标，
        <br />plain：是否朴素按钮
        <br />disabled：是否禁用
        <br />method：回调方法
        <br />
        changeId/labelChange：搭配使用，用于判断按钮是否显示(changeId: 'isDelete',labelChange: { true: '删除' })
      </div>
    </div>
    <div class="item">
      表样式属性:
      <p>height:设置表高度</p>
      <p>border:设置表边框</p>
      <p>stripe:设置表是否斑马纹</p>
    </div>
    <div class="item">
      表头配置属性:
      <div class="descColumns">
        <br />必填
        <br />
        <p>prop:列key</p>
        <p>label:列名</p>
      </div>
      <div class="descColumns">
        可选填
        <br />
        <p>align:列文本位置(left,center,right) 默认靠左</p>
        <p>width:列宽度</p>
        <p>sortable:列是否排序</p>
        <p>showTooltip:设置省略号+tooltio文字提示</p>
        <p>cellClick:设置单元格点击方法</p>
        <p>slot:是否使用特殊列插槽</p>
        <p>code:单元格点击事件权限代码</p>
        <p>formatter:列格式化</p>
        <p>show:列是否展示</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PropDesc',
  methods: {
    toLint() {
      window.open('https://element.faas.ele.me/#/zh-CN/component/table')
    },
  },
}
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
  width: 540px;
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
.descColumns {
  font-size: 15px;
}

.item {
  border: 1px solid rgb(151, 151, 158);
  padding: 20px;
  margin: 10px;
}
</style>
