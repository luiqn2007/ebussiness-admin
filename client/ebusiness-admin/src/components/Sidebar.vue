<script setup>
import {reactive} from "vue";
import {Edit} from "@element-plus/icons-vue";

const state = reactive({
  items: [{
    title: '管理模块',
    subs: [{
      path: 'typemanage',
      name: '类型管理',
    }, {
      path: 'goodmanage',
      name: '商品管理',
    }, {
      path: 'ordermanage',
      name: '订单管理',
    }]
  }, {
    title: '统计模块',
    subs: [{
      path: 'salesstatistics',
      name: '销量统计',
    }, {
      path: 'orderstatistics',
      name: '订单统计',
    }]
  }]
})
</script>

<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" unique-opened router
             background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff">
      <template v-for="(item, i) in state.items">
        <template v-if="item.subs">
          <el-sub-menu :index="(i + 1).toString()" :key="(i + 1)">
            <template #title><el-icon><edit /></el-icon>{{ item.title }}</template>
          </el-sub-menu>
          <template v-for="subItem in item.subs">
            <el-sub-menu v-if="subItem.subs" :index="subItem.path" :key="subItem.path">
              <template #title><el-icon><edit /></el-icon>{{ subItem.name }}</template>
              <el-sub-menu  v-for="(subItem2, j) in subItem.subs" :index="subItem2.path" :key="j">
                <el-icon><edit /></el-icon>{{ subItem2.name }}
              </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu v-else :index="subItem.path" :key="subItem.path">
              <el-icon><edit /></el-icon>{{ subItem.name }}
            </el-sub-menu>
          </template>
        </template>
        <el-sub-menu v-else :index="(i + 1).toString()" :key="i + 1">
          <el-icon><edit /></el-icon>{{ item.title }}
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  background: pink;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
  text-align: left;
}
</style>