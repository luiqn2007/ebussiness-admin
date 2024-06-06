<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ShoppingCart, CirclePlusFilled, Shop } from "@element-plus/icons-vue";

const router = useRouter();
const dialogVisible = true
const inputValue = ref('')
const gogo = (btn) => {
  if (btn !== 1 && sessionStorage.getItem("uname") === null) {
    router.replace('/login')
    return false
  }
  if (btn === 2 || btn === 3) {
    if (inputValue.value === '') {
      ElMessageBox.alert('<span style="color: rgb(249, 7, 7)">请输入购买量</span>', '', {dangerouslyUseHTMLString: true})
      return false
    }
  }
  if (btn === 2) {
    ElMessage.success('成功加入购物车')
  }
  if (btn === 3) {
    ElMessage.success('成功购买')
  }
  if (btn === 4) {
    ElMessage.success('成功收藏')
  }
}
</script>

<template>
  <el-dialog v-model="dialogVisible" @close="gogo(1)">
    <div class="box1">
      <div class="box2">
        <img :src="$route.params.gpicture" class="image">
      </div>
      <div class="box3">
        <p class="myfont">商品名: <span>{{$route.params.gname}}</span></p>
        <p class="myfont">原价: <span>&yen;<strike>{{$route.params.goprice}}</strike></span></p>
        <p>
          <span class="myfont">折扣价: </span>
          <span style="color: rgb(249, 7, 7); font-size: 10pt">&yen;{{$route.params.grprice}}</span>
        </p>
        <p class="myfont">类型: <span>{{$route.params.typename}}</span></p>
        <p><el-input v-model="inputValue" class="w-50 m-2" size="small" placeholder="请输入购买量" /></p>
        <p>
          <el-button type="primary" :icon="ShoppingCart" class="button" size="small" @click="gogo(2)">加入购物车</el-button>
          <el-button type="warning" :icon="Shop" class="button" size="small" @click="gogo(3)">立即购买</el-button>
          <el-button type="success" :icon="CirclePlusFilled" class="button" size="small" @click="gogo(4)">收藏</el-button>
        </p>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.myfont {

}
</style>