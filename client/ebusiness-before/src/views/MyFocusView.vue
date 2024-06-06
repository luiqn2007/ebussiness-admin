<script setup>
import {ref, reactive, computed} from 'vue'
import {useRouter, useRoute} from "vue-router";

const route = useRoute()
const router = useRouter()
const myfocusVisible = ref(true)
const goodsList = reactive([{
  id: 1,
  gname: '水果1号',
  goprice: 10.0,
  grprice: 8.0,
  gstore: 1000,
  gpicture: '../src/assets/6.jpg',
  typeid: 1,
  typename: '水果'
}, {
  id: 2,
  gname: '家电1号',
  goprice: 1000.0,
  grprice: 800.0,
  gstore: 2000,
  gpicture: '../src/assets/7.jpg',
  typeid: 2,
  typename: '家电'
}, {
  id: 3,
  gname: '服装1号',
  goprice: 100.0,
  grprice: 88.0,
  gstore: 3000,
  gpicture: '../src/assets/3.png',
  typeid: 3,
  typename: '服装'
}])

const goToGoodDetails = goods => router.push({name: 'goodsDetails', params: goods})
const goClose = () => {
  const path = route.query.redirect
  router.replace(path === '/' || path === undefined ? '/' : path)
}
const remove = goods => {
  for (let i = 0; i < goodsList.length; i++) {
    if (goods.id === goodsList[i].id) {
      goodsList.splice(i, 1)
      break
    }
  }
}

const total = ref(3)
const pageSize = ref(2)
const currentPage = ref(1)
</script>

<template>
  <el-dialog title="我的收藏" v-model="myfocusVisible" width="62%" @close="goClose">
    <el-table :data="goodsList" border>
      <el-table-column label="图片" width="80">
        <template #default="scope">
          <el-link @click="goToGoodDetails(scope.row)">
            <el-image :src="scope.row.gpicture" style="width: 50px;height: 50px;"/>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="160">
        <template #default="scope">
          <el-link @click="goToGoodDetails(scope.row)" :underline="false">
            <span>{{ scope.row.gname }}</span>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="商品实价" width="100">
        <template #default="scope">
          <span>{{ scope.row.grprice.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" width="100">
        <template #default="scope">
          <span>{{ scope.row.typename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div>
      <el-pagination background layout="prev, pager, next, total"
                     v-model="currentPage" :page-size="pageSize" :total="total" />
    </div>
  </el-dialog>
</template>

<style scoped>

</style>