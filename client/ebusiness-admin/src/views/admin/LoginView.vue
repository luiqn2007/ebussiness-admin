<script setup>

import {ref, reactive} from "vue"
import {useRoute, useRouter} from "vue-router"
import {ElMessageBox} from 'element-plus'

const loginFormRef = ref()
const loginForm = reactive({})
const rules = reactive({
  uname: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }],
  upwd: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }],
})
const loadingButton = ref(false)
const loadingButtonText = ref('登录')
const dialogVisible = ref(true)

const route = useRoute()
const router = useRouter()

const login = loginForm => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      if (loginForm.uname === 'admin' && loginForm.upwd === 'admin') {
        sessionStorage.setItem('uname', loginForm.uname)
        const path = route.query.redirect
        router.replace({path: path === '/' || path === undefined ? '/home' : path})
      } else {
        ElMessageBox.alert('用户名或密码错误', {confirmButtonText: '确定'})
        loadingButton.value = false
        loadingButtonText.value = '登录'
      }
    } else {
      ElMessageBox.alert('表单验证失败', {confirmButtonText: '确定'})
      return false
    }
  })
}

const cancel = () => loginFormRef.value.resetFields()
</script>

<template>
  <el-dialog title="管理员登录" v-model="dialogVisible" width="30%"
             :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
             @keydown.enter="login(loginForm)">
    <div class="box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" style="width: 100%" label-width="20%">
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="loginForm.uname" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
          <el-input v-model="loginForm.upwd" placeholder="请输入密码" show-password/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(loginForm)" :loading="loadingButton">{{ loadingButtonText }}
          </el-button>
          <el-button type="danger" @click="cancel">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<style scoped>
.box {
  width: 100%;
  height: 150px;
}
</style>