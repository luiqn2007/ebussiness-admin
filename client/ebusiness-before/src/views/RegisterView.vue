<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const router = useRouter();
const route = useRoute();
const formRef = ref()
const form = reactive({})
const rules = reactive({
  uname: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  upwd: [{
    required: true, message: '请输入密码', trigger: 'blur'
  }, {
    min: 6, max: 20, message: '密码长度 6 到 20', trigger: 'blur'
  }],
  reupwd: [{
    required: true, message: '请输入密码', trigger: 'blur'
  }, {
    min: 6, max: 20, message: '密码长度 6 到 20', trigger: 'blur'
  }]
})

const loadingButton = '注册'
const dialogVisible = true

const register = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('注册成功')
      const path = route.query.redirect
      router.replace(path === '/' || path === undefined ? '/login' : path)
    } else {
      console.log('error submit!', fields)
      ElMessageBox.alert(
          '<span style="color: rgb(249, 7, 7); font-size: 12pt">表单验证失败</span>', '', {dangerouslyUseHTMLString: true})
    }
  })
}
const cancel = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}
const goClose = () => router.replace('/')
</script>

<template>
  <el-dialog title="用户注册" v-model="dialogVisible" width="35%" @close="goClose">
    <div class="box">
      <el-form ref="formRef" :model="form" :rules="rules" style="width: 100%" label-width="20%">
        <el-form-item label="用户名" prop="uname" required>
          <el-input v-model="form.uname" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="upwd" required>
          <el-input v-model="form.upwd" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="reupwd" required>
          <el-input v-model="form.reupwd" placeholder="再次输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">{{loadingButton}}</el-button>
          <el-button type="danger" @click="cancel">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<style scoped>
.box {
  width: 100%;
  height: 180px;
}
</style>