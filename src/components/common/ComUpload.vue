<template>
  <el-upload v-bind="$attrs">
    <!-- <el-upload v-bind="$attrs" :action="action" :headers="headers" :disabled="disabled"> -->
    <slot></slot>
    <slot name="tip"></slot>
  </el-upload>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
