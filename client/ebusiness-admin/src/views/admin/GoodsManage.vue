<script setup>
import {reactive, ref, computed} from "vue";
import {ElMessage} from "element-plus";

const types = ref(['家电', '水果', '文具'])
const newType = ref('')
const goods = reactive([{
  id: 1000,
  name: '家电1号',
  type: '家电',
  price: 10,
  count: 10,
  img: '../src/assets/99.jpg',
  suggested: 'no',
  ads: 'no',
}, {
  id: 1001,
  name: '水果1号',
  type: '水果',
  price: 10,
  count: 10,
  img: '../src/assets/101.jpg',
  suggested: 'no',
  ads: 'yes',
}, {
  id: 1002,
  name: '文具1号',
  type: '文具',
  price: 10,
  count: 10,
  img: '../src/assets/108.jpg',
  suggested: 'yes',
  ads: 'no',
}])
const displayTypes = ref([])
const displayGoods = computed(() => {
  if (displayTypes.value.length === 0) return goods
  return goods.filter(good => displayTypes.value.includes(good.type))
})
const rules = reactive({
  name: [
    {required: true, message: '请输入商品名称', trigger: 'blur'},
    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
  ],
  price: [
    {required: true, type: 'number', message: '请输入商品价格', trigger: 'blur'},
  ],
  count: [
    {required: true, type: "number", message: '请输入商品库存', trigger: 'blur'},
  ],
  type: [
    {required: true, message: '请选择商品类型', trigger: 'change'}
  ]
})

const goodDetailVisible = ref(false)
const goodDetailFormRef = ref()
const currentGood = reactive({})
const dialogs = reactive({})
const uploadImgRef = ref()

const addType = () => {
  if (types.value.includes(newType.value)) {
    ElMessage.error('类型已存在')
  } else {
    types.value.push(newType.value)
    newType.value = ''
  }
}
const closeGoodDetail = () => goodDetailVisible.value = false
const openGoodDetail = good => {
  copyGoodDetails(good, currentGood, true)
  dialogs.title = '商品详情'
  dialogs.hasId = true
  dialogs.readonly = true
  dialogs.buttons = [{
    text: '关闭',
    type: 'default',
    action: closeGoodDetail
  }]
  goodDetailVisible.value = true
}
const openGoodAdd = () => {
  dialogs.title = '添加商品'
  dialogs.hasId = false
  dialogs.readonly = false
  dialogs.buttons = [{
    text: '取消',
    type: 'default',
    action: closeGoodDetail
  }, {
    text: '确定',
    type: 'primary',
    action: () => goodDetailFormRef.value.validate(valid => {
      if (valid) {
        let new_good = {}
        copyGoodDetails(currentGood, new_good, false)
        new_good.id = goods[goods.length - 1].id + 1
        goods.push(new_good)
        closeGoodDetail()
      } else {
        ElMessage.error('验证失败')
      }
    })
  }]
  goodDetailVisible.value = true
}
const openGoodEdit = good => {
  copyGoodDetails(good, currentGood, true)
  dialogs.title = '编辑商品'
  dialogs.hasId = true
  dialogs.readonly = false
  dialogs.buttons = [{
    text: '取消',
    type: 'default',
    action: closeGoodDetail
  }, {
    text: '确定',
    type: 'primary',
    action: () => goodDetailFormRef.value.validate(valid => {
      if (valid) {
        copyGoodDetails(currentGood, good, false)
        closeGoodDetail()
      } else {
        ElMessage.error('验证失败')
      }
    })
  }]
  goodDetailVisible.value = true
}
const handleCloseDialog = () => {
  goodDetailFormRef.value.resetFields()
  if (uploadImgRef.value) {
    uploadImgRef.value.clearFiles()
  }
}
const deleteGood = index => goods.splice(index, 1)
const uploadImg = () => {
  uploadImgRef.value.submit()
}
const handleExceed = files => {
  uploadImgRef.value.clearFiles()
  uploadImgRef.value.handleStart(files[0])
}
const handleUploaded = (response, file) => {
  currentGood.img = URL.createObjectURL(file.raw)
}
const handleUploadFailed = err => {
  ElMessage.error(err.message)
  console.log(err)
}

function copyGoodDetails(good, target, copyId) {
  if (copyId) {
    target.id = good.id
  }

  target.name = good.name
  target.type = good.type
  target.price = good.price
  target.count = good.count
  target.img = good.img
  target.suggested = good.suggested
  target.ads = good.ads
}
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="商品管理">
      <el-form inline>
        <el-form-item class="good-type" label="商品类型">
          <el-select v-model="displayTypes" placeholder="商品类型" multiple
                     collapse-tags collapse-tags-tooltip :max-collapse-tags="3">
            <el-option v-for="type in types" :key="type" :label="type" :value="type"/>
            <template #footer>
              <el-input v-model="newType" size="small">
                <template #append>
                  <el-button icon="circle-plus-filled" @click="addType"
                             :disabled="newType.length === 0"/>
                </template>
              </el-input>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="openGoodAdd">新增商品</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="displayGoods" border stripe>
        <el-table-column type="index" label="序号" min-width="15em" align="center"/>
        <el-table-column prop="id" label="商品 ID"/>
        <el-table-column prop="name" label="商品名称"/>
        <el-table-column prop="type" label="商品类型"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="success" size="small" @click="openGoodDetail(scope.row)">
              详情
            </el-button>
            <el-popconfirm title="确定删除吗？" @confirm="deleteGood(scope.$index)">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button type="primary" size="small" @click="openGoodEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
  <el-dialog :title="dialogs.title" center v-model="goodDetailVisible" @close="handleCloseDialog">
    <el-form ref="goodDetailFormRef" :model="currentGood" :rules="rules" label-width="80px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="currentGood.name" placeholder="请输入商品名称" :disabled="dialogs.readonly"/>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input type="number" v-model.number="currentGood.price" placeholder="请输入商品价格"
                  :disabled="dialogs.readonly"/>
      </el-form-item>
      <el-form-item label="商品库存" prop="count">
        <el-input type="number" v-model.number="currentGood.count" placeholder="请输入商品库存"
                  :disabled="dialogs.readonly"/>
      </el-form-item>
      <el-form-item label="商品类型">
        <el-select v-model="currentGood.type" placeholder="商品类型" :disabled="dialogs.readonly">
          <el-option v-for="type in types" :key="type" :label="type" :value="type"/>
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-image class="good-image" v-if="currentGood.img" :src="currentGood.img"/>
        <el-upload v-if="!dialogs.readonly" ref="uploadImgRef" :limit="1" :auto-upload="false" accept=".jpg,.png"
                   @exceed="handleExceed" @success="handleUploaded" @error="handleUploadFailed">
          <template #trigger>
            <el-button size="small" type="primary">选择文件</el-button>
            <el-button size="small" type="success" @click.stop="uploadImg">单击上传</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip">只能上传 .jpg .png 文件</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否推荐">
        <el-radio-group v-model="currentGood.suggested" :disabled="dialogs.readonly">
          <el-radio value="yes">是</el-radio>
          <el-radio value="no">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否广告">
        <el-radio-group v-model="currentGood.ads" :disabled="dialogs.readonly">
          <el-radio value="yes">是</el-radio>
          <el-radio value="no">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer v-if="dialogs.buttons && dialogs.buttons.length > 0">
      <el-button v-for="button in dialogs.buttons" :type="button.type" @click="button.action">{{ button.text }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.good-type {
  width: 30%
}

.good-image {
  width: 120px;
  height: 120px;
  padding-right: 10px
}

.el-upload__tip {
  color: red
}
</style>