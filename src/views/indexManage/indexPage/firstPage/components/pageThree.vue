<!--
 * @Descripttion:
 * @Author: zhanglinli
 * @Date: 2020-09-28 09:31:54
 * @LastEditors: zhanglinli
 * @LastEditTime: 2020-12-25 16:58:56
-->
<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix container-page-title"
      :style="{'background':theme.pageTitleBgColor,'color':theme.pageTitleTextColor}"
    >
      <el-row type="flex" justify="space-between">
        <span>快捷入口</span>
        <el-button type="text">
          <span :style="{'color':theme.pageTitleTextColor}">
            <i class="el-icon-edit-outline" />编辑
          </span>
        </el-button>
      </el-row>
    </div>

    <div class="container-page-main">
      <template v-for="(item,index) in getList">
        <div
          :key="index"
          style="float:left;text-align:center;padding:20px 15px 30px 20px"
          @click="toLint(item.link)"
        >
          <router-link :to="item.link">
            <i
              :class="item.icon"
              style="font-size:50px;margin-bottom:10px"
              :style="{'color':theme.elTheme}"
            />
            <br />
            {{ item.aTitle }}
          </router-link>
        </div>
      </template>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      getList: [
        {
          // icon: 'el-icon-tickets',
          icon: 'el-icon-document',
          aTitle: '保单列表',
          link: '/policySelect/policySelect',
        },
        {
          // icon: 'el-icon-s-order',
          icon: 'el-icon-document',
          aTitle: '信函列表',
          link: '/letterSelect/letterSelect',
        },
        {
          icon: 'el-icon-document',
          aTitle: '保单地址质检',
          link: '/policyAddressQuality',
        },
        {
          icon: 'el-icon-document',
          aTitle: '信函地址质检',
          link: '/letterAddressQuality',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['theme']),
  },
  methods: {
    toLint(path) {
      this.$router.push(this.pathCompile(path))
    },
  },
}
</script>

<style scoped>
a {
  color: grey;
}
a:focus,
a:hover {
  filter: brightness(0.5) !important;
}
</style>
