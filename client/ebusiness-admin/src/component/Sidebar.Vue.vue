<script setup>
import { reactive } from "vue";

const state = reactive({
  items: [{
    index: 1,
    title: '管理模块',
    subs: [{
      index: 'typemanage',
      name: '类型管理',
    }, {
      index: 'goodmanage',
      name: '商品管理',
    }, {
      index: 'ordermanage',
      name: '订单管理',
    }]
  }, {
    index: 2,
    title: '统计模块',
    subs: [{
      ndex: 'salesstatistics',
      name: '销量统计',
    }, {
      ndex: 'orderstatistics',
      name: '订单统计',
    }]
  }]
})
</script>

<template>
<div class="sidebar">
  <el-menu class="sidebar-el-menu" unique-opened router
           background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff">
    <template v-for="item in state.items">
      <template v-if="item.subs">
        <el-sub-menu :index="item.index" :key="item.index">
          <template #title><el-icon><Menu/></el-icon>{{ item.title }}</template>
          <template v-for="sub in item.subs">
            <template v-if="sub.subs" :index="sub.index" :key="sub.index">
              <template #title></template>
            </template>
            <template v-else>

            </template>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>

      </template>
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