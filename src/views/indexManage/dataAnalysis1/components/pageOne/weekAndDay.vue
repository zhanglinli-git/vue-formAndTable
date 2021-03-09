<!--
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-01-20 17:34:01
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-01-21 13:57:05
-->
<template>
  <el-row v-if="item" type="flex" justify="space-between">
    <span class="week">
      周变化
      <template v-if="item.week >= 0">
        <span style="color:red">
          <i class="el-icon-caret-top" />
          {{ item.week }}
        </span>
      </template>
      <template v-else>
        <span style="color:rgb(0, 255, 65)">
          <i class="el-icon-caret-bottom" />
          {{ item.week.toString().replace(/\-/g,'') }}
        </span>
      </template>
    </span>
    <span class="day">
      日变化
      <template v-if="item.day >= 0">
        <span style="color:red">
          <i class="el-icon-caret-top" />
          {{ item.day }}
        </span>
      </template>
      <template v-else>
        <span style="color:rgb(0, 255, 65)">
          <i class="el-icon-caret-bottom" />
          {{ item.day.toString().replace(/\-/g,'') }}
        </span>
      </template>
    </span>
  </el-row>
</template>

<script>
export default {
  name: 'WeekAndDay',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
<style scoped>
.week,
.day {
  font-size: 12px;
}
</style>
