<template>
  <LayoutForm>
    <el-form ref="formRef" class="com-form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" clearable maxlength="15" show-word-limit />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" clearable maxlength="60" show-word-limit />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio v-for="(item, key) in typeMap" :key="key" :label="key">{{ item.span }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="tab栏" prop="hideTab">
        <el-radio-group v-model="formData.hideTab">
          <el-radio :label="true">显示</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="formData.icon" placeholder="请输入图标" clearable maxlength="40" show-word-limit />
      </el-form-item>
      <el-form-item label="父菜单" prop="pids">
        <el-cascader v-model="formData.pids" :options="menuTree" :props="cascaderProps" clearable />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button type="primary" @click="saveData">保存</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </template>
  </LayoutForm>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getMenuDateilApi, addMenuApi, editMenuApi, getMenuParentApi } from '@/apis/system/menu'
import { typeMap } from './menuData'
import { cloneDeep } from '@/utils'

const router = useRouter()
const route = useRoute()
const pageType = ref(String(route.query.type) || '')
const id = ref(String(route.query.id) || '')

// 菜单信息
const menuTree = ref<Router.Route[]>([])
const cascaderProps = {
  checkStrictly: true,
  expandTrigger: 'hover',
  value: 'id',
  label: 'title'
}

// 表单信息
const formData = ref<Router.Route>({
  title: '',
  name: '',
  type: 'view',
  icon: '',
  hideTab: false,
  pids: []
})
// 获取角色信息
onMounted(async () => {
  if (id.value && (pageType.value === 'edit' || pageType.value === 'detail')) {
    const { data } = await getMenuDateilApi(id.value)
    if (data.id) {
      formData.value = cloneDeep(data)
      formData.value.pids = data.pids || []
      formData.value.icon = data.icon || ''
      formData.value.hideTab = data.hideTab || false
    }
  }
  const menuData = await getMenuParentApi()
  menuTree.value = menuData.data
})

// 表单规则配置
const formRef = ref<any>()
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  hideTab: [{ required: true, message: '请选择tab栏状态', trigger: 'change' }]
}

// 保存数据
const saveData = async () => {
  try {
    await formRef.value.validate()
    if (pageType.value === 'edit' && id.value) {
      await editMenuApi(formData.value)
      ElMessage.success('编辑成功')
    } else {
      await addMenuApi(formData.value)
      ElMessage.success('新增成功')
    }
    router.back()
  } catch (error) {
    console.log(error)
  }
}
</script>
<style lang="scss">
.el-cascader-panel .el-radio {
  position: absolute;
  width: calc(100% - 50px);
  .el-radio__input {
    visibility: hidden;
  }
}
</style>
