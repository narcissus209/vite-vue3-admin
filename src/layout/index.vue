<template>
  <div class="layout">
    <LayoutAside></LayoutAside>
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
    <LayoutFooter></LayoutFooter>
  </div>
</template>
<script setup lang="ts">
import LayoutAside from './components/LayoutAside.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutMain from './components/LayoutMain.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>
<style scoped>
.layout {
  position: relative;
  height: 100vh;
  width: 100%;
  min-width: 1000px;
}
</style>
