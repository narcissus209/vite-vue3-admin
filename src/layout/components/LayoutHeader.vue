<template>
  <header class="layout-header" :style="headerStyle">
    <el-icon class="open-close" color="#293146" :size="18">
      <fold />
    </el-icon>
    <HeaderBreadcrumb class="header-breadcrumb"></HeaderBreadcrumb>
    <HeaderOptions class="operations"></HeaderOptions>
  </header>
  <LayoutTabber></LayoutTabber>
</template>
<script setup lang="ts">
import LayoutTabber from './LayoutTabber.vue'
import HeaderBreadcrumb from './header/HeaderBreadcrumb.vue'
import HeaderOptions from './header/HeaderOptions.vue'
import { useLayoutStore } from '@/store'
const { headerStyle } = useLayoutStore()
</script>
<style scoped lang="scss">
.layout-header {
  background: #ffffff;
  width: 100%;
  z-index: 10;
  display: flex;
  border-bottom: 1px solid #eee;
  .open-close {
    height: 100%;
    width: 38px;
    cursor: pointer;
    &:hover {
      background: #f6f6f6;
    }
  }
  .header-breadcrumb {
    margin-left: 12px;
  }
  .operations {
    flex-grow: 1;
    @include flex(center, flex-end);
    padding-right: 12px;
  }
}
</style>
