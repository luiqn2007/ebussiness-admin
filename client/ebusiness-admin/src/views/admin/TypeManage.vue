<script setup>
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";

import Header from "../../components/Header.vue";
import Sidebar from "../../components/Sidebar.vue";

let types = reactive([{
  id: 1000,
  name: '家电',
}, {
  id: 1001,
  name: '水果',
}, {
  id: 1002,
  name: '文具'
}])

const FORM_ADD = 'add'
const FORM_UPDATE = 'update'
let currentForm = ref('')
const addFormRef = reactive({})
const addForm = reactive({})

const rules = reactive({
  typename: [
    {required: true, message: '请输入类型名称', trigger: 'blur'},
    {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
  ]
})
const detailDataRef = reactive({})
const detailData = reactive({})
const total = ref(3)
const pageSize = ref(2)
const currentPage = ref(1)

const openAdd = () => {
  currentForm.value = FORM_ADD
  addForm.id = ''
  addForm.name = ''
}
const add = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      addForm.id = types[types.length - 1].id + 1
      types.push({
        id: addForm.id,
        name: addForm.name,
      })
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
    } else {
      console.log('error submit!')
    }
  })
}

const cancelAdd = () => {
  addFormRef.resetFields()
  currentForm.value = ''
}

const update = async (formEl) => {
  if (!formEl) return
  await formEl.valid((valid) => {
    if (valid) {
      types.map(t => {
        if (t.id === detailData.id) {
          t.name = detailData.name
        }
        return t
      })
      ElMessage({ message: '修改成功', type: 'success' })
      currentForm = ''
    } else {
      ElMessage({ message: '表单验证失败', type: 'error' })
    }
  })
}

const openUpdate = (row) => {
  currentForm.value = FORM_UPDATE
  detailData.id = row.id
  detailData.name = row.name
}

const confirmEvent = (row, index) => {
  types.splice(index, 1)
  total.value = types.length
  ElMessage({ message: '删除成功', type: 'success' })
}

const cancelEvent = () => {}
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="类型管理">
      <div class="fl" style="margin-top: -10px; margin-bottom: 10px;">
        <el-button type="success" @click="openAdd">添加类型</el-button>
      </div>
      <el-table :data="types" border>
        <el-table-column type="index" label="序号" width="150" />
        <el-table-column prop="id" label="类型 ID" width="150" />
        <el-table-column prop="name" label="类型名称" width="150" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-row>
              <el-button type="primary" size="small" @click="openUpdate(scope.row)">修改</el-button>
              <el-popconfirm confirm-button-text="是" cancel-button-text="否"
                             icon="el-icon-info" icon-color="#626aef" title="确定删除吗？"
                             @confirm="confirmEvent(scope.row, scope.$index)" @cancel="cancelEvent">
                <template #reference><el-button type="danger" size="small">删除</el-button></template>
              </el-popconfirm>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination background layout="total, prev, pager, next"
                       :current-page="currentPage" :page-size="pageSize" :total="total" />
      </div>
    </el-tab-pane>
  </el-tabs>
  <el-dialog v-model="currentForm === FORM_ADD" title="添加类型">
    <el-form ref="addFormRef" :model="addForm" :rules="rules">
      <el-input v-model = "addForm.id" hidden="hidden" />
      <el-form-item label="类型名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入类型名称" />
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog></el-dialog>
</template>

<style scoped>

</style>