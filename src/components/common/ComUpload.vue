<template>
  <el-upload v-bind="$attrs" :action="UPLOAD_SERVE" :headers="headers">
    <slot></slot>
  </el-upload>
</template>
<script setup lang="ts">
import { UPLOAD_SERVE } from '@/apis/service'
const headers = {}
</script>
<style lang="scss" scoped></style>
