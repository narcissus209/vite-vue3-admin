<template>
  <LayoutForm>
    <el-form ref="formRef" class="com-form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="账号名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入你的账号名称" clearable maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="formData.roleId" placeholder="请选择你的角色" clearable>
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入你的邮箱" clearable maxlength="40" show-word-limit />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入你的手机号" clearable maxlength="11" show-word-limit autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入你的密码" clearable maxlength="16" type="password" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input
          v-model="formData.rePassword"
          placeholder="请再次输入你的密码"
          clearable
          maxlength="16"
          type="password"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="formData.avatar" />
        <div class="tips">请上传你的头像，宽高1:1，大小不超过200kb</div>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button type="primary" @click="saveData">保存</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </template>
  </LayoutForm>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getAccountDateilApi, addAccountApi, editAccountApi } from '@/apis/system/account'
import { getRoleListApi } from '@/apis/system/role'
import { validatePhone, validateEmail, validatePassword } from '@/utils/validate'
import { cloneDeep } from '@/utils'
import type { IAccount, IRole } from '@/typings/api'

const route = useRoute()
const pageType = ref(String(route.query.type) || '')
const id = ref(String(route.query.id) || '')

// 表单信息
const formData = ref<IAccount>({
  name: '',
  roleId: '',
  phone: '',
  email: '',
  password: '',
  rePassword: '',
  avatar: ''
})
// 获取角色信息
const roleList = ref<IRole[]>([])
onMounted(async () => {
  if (id.value && (pageType.value === 'edit' || pageType.value === 'detail')) {
    const { data } = await getAccountDateilApi(id.value)
    if (data.id) {
      formData.value = cloneDeep(data)
      formData.value.password = ''
    }
  }
  const { data } = await getRoleListApi({ all: 1 })
  roleList.value = data.list
})

// 规则配置
const formRef = ref<any>()
const validateRePassword = (rule: any, value: any, callback: any) => {
  if (value !== formData.value.password) {
    return callback(new Error('两次密码输入不一致'))
  }
  callback()
}
const rules = {
  name: [{ required: true, message: '请输入你的账号名称', trigger: 'blur' }],
  roleId: [{ required: true, message: '请选择你的角色', trigger: 'change' }],
  phone: [
    { required: true, message: '请输入你的手机号', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入你的邮箱', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入你的密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  rePassword: [
    { required: true, message: '请再次输入你的密码', trigger: 'blur' },
    { validator: validateRePassword, trigger: 'blur' }
  ],
  avatar: [{ required: true, message: '请上传你的头像', trigger: ['change', 'blur'] }]
}

const saveData = async () => {
  try {
    await formRef.value.validate()
    if (pageType.value === 'edit' && id.value) {
      await editAccountApi(formData.value)
    } else {
      await addAccountApi(formData.value)
    }
    console.log('success')
  } catch (error) {
    console.log(error)
  }
}
</script>
