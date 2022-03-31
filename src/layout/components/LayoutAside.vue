<template>
  <aside class="layout-aside" :style="asideStyle">
    <el-menu :default-active="defaultActive">
      <MenuBar :menuList="menu"></MenuBar>
    </el-menu>
  </aside>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuBar from './MenuBar.vue'
import { useLayoutStore, usePermissionStore } from '@/store'
const { asideStyle } = useLayoutStore()
const { menu } = usePermissionStore()
const route = useRoute()
const defaultActive = computed(() => {
  return route.path.split('/').slice(0, -1).join('/')
})
</script>
<style scoped lang="scss">
@import '@/styles/scrollbar.scss';
.layout-aside {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 20;
  box-shadow: 2px 0 8px #1d23290d;
  background: #fff;
  @include scrollbar(0);
  &:hover {
    @include scrollbar();
  }
  .el-menu {
    border-right: 0;
  }
}
</style>
