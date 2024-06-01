<script>
export default {
  name: 'LoginView',
  data() {
    return {
      loginForm: {},
      rules: {
        uname: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        upwd: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      loadingButton: false,
      loadingButtonText: '登录',
      dialogVisible: true
    }
  },
  methods: {
    login(loginForm) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (loginForm.uname === 'admin' && loginForm.upwd === 'admin') {
            this.$alert('登录成功', { confirmButtonText: '确定' })
            sessionStorage.setItem('uname', loginForm.uname)
            const path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
          } else {
            this.$alert('用户名或密码错误', { confirmButtonText: '确定' })
            this.loadingButton = false
            this.loadingButtonText = '登录'
          }
        } else {
          this.$alert('表单验证失败', { confirmButtonText: '确定' })
          return false
        }
      })
    },
    cancel() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<template>
<el-dialog title="管理员登录" v-model="dialogVisible" width="30%">
  <div class="box">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" style="width: 100%" label-width="20%">
      <el-form-item label="用户名" prop="uname">
        <el-input v-model="loginForm.uname" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input v-model="loginForm.upwd" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login(loginForm)" :loading="loadingButton">{{ loadingButtonText }}</el-button>
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