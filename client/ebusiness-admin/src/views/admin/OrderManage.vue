<script setup>
import {ref, reactive, computed} from "vue";
import {ElMessage} from "element-plus";
import {ArrowDown, ArrowRight} from "@element-plus/icons-vue";

const orders = ref([{
  id: 1002,
  money: 2343.0,
  date: "2022-11-11",
  status: '未支付',
  goods: [{
    id: 10003,
    name: '家电2号',
    price: 999.0,
    count: 1
  }, {
    id: 10004,
    name: '家具1号',
    price: 1280.0,
    count: 1
  }, {
    id: 10005,
    name: '蔬菜1号',
    price: 12.8,
    count: 5
  }]
}, {
  id: 1003,
  money: 264.0,
  date: "2022-11-11",
  status: '未支付',
  goods: [{
    id: 10003,
    name: '家电2号',
    price: 999.0,
    count: 1
  }, {
    id: 10004,
    name: '家具1号',
    price: 1280.0,
    count: 1
  }, {
    id: 10005,
    name: '蔬菜1号',
    price: 12.8,
    count: 5
  }]
}, {
  id: 1004,
  money: 281.6,
  date: "2022-11-11",
  status: '已支付',
  goods: [{
    id: 10003,
    name: '家电2号',
    price: 999.0,
    count: 1
  }, {
    id: 10004,
    name: '家具1号',
    price: 1280.0,
    count: 1
  }, {
    id: 10005,
    name: '蔬菜1号',
    price: 12.8,
    count: 5
  }]
}])

const total = ref(3)
const pageSize = ref(2)
const currentPage = ref(1)

const orderSearchRef = ref()
const orderSearch = ref('')

const cancelOrder = index => orders.value.splice(index, 1)

const goods = ref([])
const goodsVisible = ref(false)
const showGoods = index => {
  goods.value = orders.value[index].goods
  goodsVisible.value = true
}

const searchedOrders = ref([])
const orderVisible = ref(false)
const expendOrder = ref(-1)
const showOrder = () => {
  searchedOrders.value = orders.value.filter(ord => ord.id === parseInt(orderSearch.value))
  if (searchedOrders.value.length === 0) {
    ElMessage.error(`订单 ${orderSearch.value} 不存在`)
  } else {
    expendOrder.value = 0
    orderVisible.value = true
  }
}
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="订单管理">
      <el-form inline>
        <el-form-item label="订单编号">
          <el-input v-model="orderSearch" ref="orderSearchRef" placeholder="请输入订单号"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="showOrder">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="orders">
        <el-table-column label="订单编号" prop="id"/>
        <el-table-column label="订单金额" prop="money"/>
        <el-table-column label="下单时间" prop="date"/>
        <el-table-column label="订单状态" prop="status"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="showGoods(scope.$index)">详情</el-button>
            <el-button size="small" type="danger" v-if="scope.row.status === '未支付'"
                       @click="cancelOrder(scope.$index)">取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination class="pages" background layout="prev,pager,next,total"
                       v-model:current-page="currentPage" :page-size="pageSize" :total="total"/>
      </div>
    </el-tab-pane>
  </el-tabs>
  <el-dialog title="订单详情" v-model="goodsVisible">
    <el-table :data="goods">
      <el-table-column label="商品编号" prop="id"/>
      <el-table-column label="商品名称" prop="name"/>
      <el-table-column label="商品价格" prop="price"/>
      <el-table-column label="商品数量" prop="count"/>
      <el-table-column label="商品总价">
        <template #default="scope">{{ scope.row.price * scope.row.count }}</template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog title="订单搜索结果" v-model="orderVisible">
    <el-table :data="searchedOrders" border>
      <el-table-column label="">
        <template #default="scope">
          <div v-if="expendOrder === scope.$index" @click="expendOrder = -1">
            <el-icon><ArrowDown/></el-icon>
          </div>
          <div v-if="expendOrder !== scope.$index" @click="expendOrder = scope.$index">
            <el-icon><ArrowRight/></el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="id"/>
      <el-table-column label="订单金额" prop="money"/>
      <el-table-column label="下单时间" prop="date"/>
      <el-table-column label="订单状态" prop="status"/>
    </el-table>
    <el-table v-if="expendOrder >= 0" :data="searchedOrders[expendOrder].goods" border>
      <el-table-column label="商品编号" prop="id"/>
      <el-table-column label="商品名称" prop="name"/>
      <el-table-column label="商品价格" prop="price"/>
      <el-table-column label="商品数量" prop="count"/>
      <el-table-column label="商品总价">
        <template #default="scope">{{ scope.row.price * scope.row.count }}</template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<style scoped>
.pages {
  margin-top: 22px
}
</style>