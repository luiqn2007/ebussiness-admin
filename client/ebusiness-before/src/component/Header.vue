<script setup>
import {reactive, ref, computed, defineEmits} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {Search} from "@element-plus/icons-vue";

const router = useRouter();
const userName = sessionStorage.getItem('uname')
const myemits = defineEmits(['goIndex', 'searchIndex']);
const isLogin = computed(() => userName != null)

const toIndex = typeid => myemits('goIndex', typeid)
const toSearch = () => myemits('searchIndex', searchForm.gname)

const searchForm = reactive({gname: ''})
const logout = () => {
  sessionStorage.removeItem('uname')
  ElMessage.success('已登出')
  router.go(0)
}

const myorder = () => router.push({name: 'myorder'})
const register = () => router.push({name: 'register'})
const login = () => router.push({name: 'login'})
const mycart = () => router.push({name: 'mycart'})
const myselfinfo = () => router.push({name: 'myselfinfo'})
const myfocus = () => router.push({name: 'myfocus'})

const goodsTypes = ref([
  {typeid: 0, typename: '首页'},
  {typeid: 1, typename: '水果'},
  {typeid: 2, typename: '家电'},
  {typeid: 3, typename: '服装'},
  {typeid: 4, typename: '文具'},
  {typeid: 5, typename: '图书'},
  {typeid: 6, typename: '酒水'},
])

const imgList = ref([
  {name: 1, src: '../src/assets/1.jpg', title: '111'},
  {name: 2, src: '../src/assets/2.jpg', title: '222'},
  {name: 3, src: '../src/assets/3.png', title: '333'},
  {name: 4, src: '../src/assets/4.jpg', title: '444'},
  {name: 5, src: '../src/assets/5.jpg', title: '555'},
])
</script>

<template>
  <el-container>
    <el-header style="height: 30px;background-color: #f8f8ff;">
      <el-row align="middle" style="margin-top: 5px;">
        <el-col :span="3"><div class="coldiv">欢迎光临 eBusiness</div></el-col>
        <el-col :span="1">
          <div class="coldiv">
            <span v-if="isLogin">{{ userName }}</span>
            <el-link v-else @click="login" :underline="false">登录</el-link>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="coldiv"><el-link v-if="!isLogin" @click="register" :underline="false">注册</el-link></div>
        </el-col>
        <el-col :span="9"><div></div></el-col>
        <el-col :span="2">
          <div class="coldiv"><el-link @click="myselfinfo" v-if="isLogin" :underline="false">个人信息</el-link></div>
        </el-col>
        <el-col :span="2">
          <div class="coldiv"><el-link @click="mycart" v-if="isLogin" :underline="false">我的购物车</el-link></div>
        </el-col>
        <el-col :span="2">
          <div class="coldiv"><el-link @click="myfocus" v-if="isLogin" :underline="false">我的收藏</el-link></div>
        </el-col>
        <el-col :span="2">
          <div class="coldiv"><el-link @click="myorder" v-if="isLogin" :underline="false">我的订单</el-link></div>
        </el-col>
        <el-col :span="2">
          <div class="coldiv"><el-link @click="logout" v-if="isLogin" :underline="false">安全退出</el-link></div>
        </el-col>
      </el-row>
    </el-header>
    <div>
      <el-carousel :interval="5000" arrow="always" height="200px">
        <el-carousel-item v-for="img in imgList" :key="img.name">
          <img :src="img.src" :alt="img.title" alt="图片丢失了" style="width: 100%;height: 100%;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-footer style="height: 35px;background-color: #f8f8ff;">
      <el-row style="margin-top: 5px;">
        <el-col :span="18">
          <el-row>
            <el-col :span="2" v-for="type in goodsTypes" :key="type.typeid">
              <div class="coldiv">
                <el-link @click="toIndex(type.typeid)" :underline="false">{{ type.typename }}</el-link>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
            <el-form-item><el-input v-model="searchForm.gname" placeholder="请输入商品名" /></el-form-item>
            <el-form-item><el-button type="primary" @click="toSearch" :icon="Search">搜索</el-button></el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<style scoped>
.coldiv {
  font-size: 11pt;
  color: rgb(125, 123, 123);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>