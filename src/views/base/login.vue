<template>
  <el-button @click="login">登录</el-button>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
const userStore = useUserStore()

userStore.logout()

const router = useRouter()
const login = async () => {
  await userStore.login({ a: 12 })
  router.push('/')
}
</script>
<style scoped></style>
