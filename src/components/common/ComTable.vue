<template>
  <el-table id="tableRef" stripe border v-bind="props">
    <slot></slot>
  </el-table>
</template>
<script setup lang="ts">
const props = defineProps({})
</script>
