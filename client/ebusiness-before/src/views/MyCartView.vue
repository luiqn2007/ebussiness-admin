<script setup>
import {ref, reactive, computed} from 'vue'
import {useRouter, useRoute} from "vue-router";
import {Delete} from "@element-plus/icons-vue";

const route = useRoute()
const router = useRouter()
const myfocusVisible = ref(true)
const goodsList = reactive([{
  id: 1,
  gname: '水果1号',
  goprice: 10.0,
  grprice: 8.0,
  gstore: 1000,
  shopnum: 10,
  gpicture: '../src/assets/6.jpg',
  typeid: 1,
  typename: '水果'
}, {
  id: 2,
  gname: '家电1号',
  goprice: 1000.0,
  grprice: 800.0,
  gstore: 2000,
  shopnum: 5,
  gpicture: '../src/assets/7.jpg',
  typeid: 2,
  typename: '家电'
}, {
  id: 3,
  gname: '服装1号',
  goprice: 100.0,
  grprice: 88.0,
  gstore: 3000,
  shopnum: 20,
  gpicture: '../src/assets/3.jpg',
  typeid: 3,
  typename: '服装'
}])

const goToGoodDetails = goods => router.push({name: 'goodsDetails', params: goods})
const goClose = () => {
  const path = route.query.redirect
  router.replace(path === '/' || path === undefined ? '/' : path)
}
const reduce = goods => {
  if (goods.shopnum === 1) return
  goods.shopnum--
}
const add = goods => goods.shopnum++
const remove = goods => {
  for (let i = 0; i < goodsList.length; i++) {
    if (goods.id === goodsList[i].id) {
      goodsList.splice(i, 1)
      break
    }
  }
}
const totalPrice = computed(() => goodsList
    .map(goods => goods.grprice * goods.shopnum)
    .reduce((prev, cur) => prev + cur, 0.0)
    .toFixed(2))
const removeAll = () => goodsList.splice(0)
</script>

<template>
  <el-dialog title="我的购物车" v-model="myfocusVisible" width="62%" @close="goClose">
    <el-table :data="goodsList" border>
      <el-table-column label="图片" width="80">
        <template #default="scope">
          <el-link @click="goToGoodDetails(scope.row)">
            <el-image :src="scope.row.gpicture" style="width: 50px;height: 50px;"/>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="155">
        <template #default="scope">
          <el-link @click="goToGoodDetails(scope.row)" :underline="false">
            <span>{{ scope.row.gname }}</span>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="商品实价" width="105">
        <template #default="scope">
          <span>{{ scope.row.grprice.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买数量" width="150">
        <template #default="scope">
          <el-button size="small" type="success" @click="reduce(scope.row)" :disabled="scope.row.shopnum === 1">-</el-button>
          <span>&nbsp;{{scope.row.shopnum}}&nbsp;</span>
          <el-button size="small" type="success" @click="add(scope.row)">+</el-button>
        </template>
      </el-table-column>
      <el-table-column label="小计" width="150">
        <template #default="scope">
          <span>{{(scope.row.grprice * scope.row.shopnum).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="100">
        <template #default="scope">
          <el-button size="small" type="danger" :icon="Delete" circle @click="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div>
      总价: ￥{{totalPrice}}&nbsp;
      <el-button type="danger" :icon="Delete" @click="removeAll">清空</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>