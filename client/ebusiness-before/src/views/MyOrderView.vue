<script setup>
import {reactive, ref} from "vue";
import {useRouter, useRoute} from "vue-router";

const router = useRouter();
const route = useRoute();

const orders = reactive([{
  ordersn: 1000,
  orderAmount: 281.6,
  orderDate: '2022-08-10',
  orderStatus: '已支付',
  orderUserId: 100,
  orderDetail: [{
    gno: 10000,
    gname: '苹果1号',
    gprice: 12.8,
    shopNum: 2,
    smallTotal: 25.6
  }, {
    gno: 10001,
    gname: '服装1号',
    gprice: 128.0,
    shopNum: 2,
    smallTotal: 256.0
  }]
}, {
  ordersn: 1001,
  orderAmount: 264.0,
  orderDate: '2022-10-15',
  orderStatus: '未支付',
  orderUserId: 101,
  orderDetail: [{
    gno: 10002,
    gname: '文具1号',
    gprice: 88.0,
    shopNum: 3,
    smallTotal: 264.0
  }]
}, {
  ordersn: 1002,
  orderAmount: 2343.0,
  orderDate: '2022-11-11',
  orderStatus: '未支付',
  orderUserId: 102,
  orderDetail: [{
    gno: 10003,
    gname: '家电2号',
    gprice: 999.0,
    shopNum: 1,
    smallTotal: 999.0
  }, {
    gno: 10004,
    gname: '家具1号',
    gprice: 1280.0,
    shopNum: 1,
    smallTotal: 1280.0
  }, {
    gno: 10005,
    gname: '蔬菜1号',
    gprice: 12.8,
    shopNum: 5,
    smallTotal: 64.0
  }]
}])

const orderDetailVisible = ref(false)
const myorderVisible = ref(true)
const detailResult = reactive([{}])

const total = ref(3)
const pageSize = ref(2)
const currentPage = ref(1)

const handleDetail = row => {
  Object.assign(detailResult, row.orderDetail)
  detailResult.splice(row.orderDetail.length, detailResult.length)
  orderDetailVisible.value = true
}
const goClose = () => {
  const path = route.query.redirect
  router.replace(path === '/' || path === undefined ? '/' : path)
}
</script>

<template>
  <el-dialog title="我的订单" v-model="myorderVisible" width="60%" @close="goClose">
    <el-table :data="orders">
      <el-table-column label="订单编号" prop="ordersn"/>
      <el-table-column label="订单金额" prop="orderAmount"/>
      <el-table-column label="下单时间" prop="orderDate"/>
      <el-table-column label="订单状态" prop="orderStatus"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination background layout="prev, pager, next, total"
                     v-model="currentPage" :page-size="pageSize" :total="total" />
    </div>
  </el-dialog>
  <el-dialog title="订单详情" v-model="orderDetailVisible">
    <el-table :data="detailResult">
      <el-table-column label="商品编号" prop="gno"/>
      <el-table-column label="商品名称" prop="gname"/>
      <el-table-column label="商品价格" prop="gprice"/>
      <el-table-column label="商品数量" prop="shopNum"/>
      <el-table-column label="小计" prop="smallTotal"/>
    </el-table>
  </el-dialog>
</template>

<style scoped>

</style>