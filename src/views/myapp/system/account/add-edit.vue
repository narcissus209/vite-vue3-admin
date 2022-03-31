<template>
  <LayoutForm>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ pageType }}</h1>
    <div>{{ formData }}</div>
    <template v-slot:footer>
      <el-button type="primary">保存</el-button>
    </template>
  </LayoutForm>
</template>
<script setup lang="ts">
import formModel from '@/model/formModel'
import { toRefs } from 'vue'
import { getAccountDateilApi, addAccounApi, editAccountApi } from '@/apis/system/account'

// 定义查询参数
const defaultFormData = {
  roleId: '',
  name: '',
  phone: '',
  email: '', //随机邮箱
  password: '',
  avatar: ''
}

const { state, init } = formModel(defaultFormData, getAccountDateilApi, addAccounApi, editAccountApi)
const { formData, pageType, id } = toRefs(state)
init()
</script>
<style></style>
