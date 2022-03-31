<template>
  <div v-show="tabbarShow" class="layout-tabbar" :style="tabbarStyle">
    <HeaderTag></HeaderTag>
  </div>
</template>
<script setup lang="ts">
import HeaderTag from './header/HeaderTag.vue'
import { useLayoutStore } from '@/store'
const { tabbarStyle, tabbarShow } = useLayoutStore()
</script>
<style scoped lang="scss">
.layout-tabbar {
  background: #ffffff;
  width: 100%;
  z-index: 10;
}
</style>
