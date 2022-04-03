<template>
  <LayoutForm>
    <el-form ref="formRef" class="com-form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入你的角色名称" clearable maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="角色" prop="state">
        <el-radio-group v-model="formData.state">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
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
import { getRoleDateilApi, addRoleApi, editRoleApi } from '@/apis/system/role'
import { cloneDeep } from '@/utils'
import type { IRole } from '@/typings/api'

const router = useRouter()
const route = useRoute()
const pageType = ref(String(route.query.type) || '')
const id = ref(String(route.query.id) || '')

// 表单信息
const formData = ref<IRole>({
  name: '',
  state: 1
})
// 获取角色信息
onMounted(async () => {
  if (id.value && (pageType.value === 'edit' || pageType.value === 'detail')) {
    const { data } = await getRoleDateilApi(id.value)
    if (data.id) {
      formData.value = cloneDeep(data)
    }
  }
})

// 表单规则配置
const formRef = ref<any>()
const rules = {
  name: [{ required: true, message: '请输入你的角色名称', trigger: 'blur' }],
  state: [{ required: true, message: '请选择你的角色状态', trigger: 'change' }]
}

// 保存数据
const saveData = async () => {
  try {
    await formRef.value.validate()
    if (pageType.value === 'edit' && id.value) {
      await editRoleApi(formData.value)
      ElMessage.success('编辑成功')
    } else {
      await addRoleApi(formData.value)
      ElMessage.success('新增成功')
    }
    router.back()
  } catch (error) {
    console.log(error)
  }
}
</script>
