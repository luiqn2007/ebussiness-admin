<script setup>
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";

const orders = reactive([{
  id: 1002,
  money: 2343.0,
  date: "2022-11-11",
  status: '未支付'
}, {
  id: 1003,
  money: 264.0,
  date: "2022-11-11",
  status: '未支付'
}, {
  id: 1004,
  money: 281.6,
  date: "2022-11-11",
  status: '已支付'
}])

const pageCount = ref(2)
const currentPage = ref(1)

const orderSearchRef = ref()
const orderSearch = ref('')
</script>

<template>
<el-tabs type="border-card">
  <el-tab-pane label="订单管理">
    <el-form inline>
      <el-form-item label="订单编号">
        <el-input v-model="orderSearch" ref="orderSearchRef" placeholder="请输入订单号" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-tab-pane>
</el-tabs>
</template>

<style scoped>

</style>