<template>
  <div class="header-operations">
    <el-dropdown class="ml-12">
      <el-avatar class="cursor-pointer" :size="32" :src="circleUrl" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
</script>
<style lang="scss" scoped>
.header-operations {
  .ml-12 {
    margin-left: 12px;
  }
}
</style>
