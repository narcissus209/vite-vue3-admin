<template>
  <div class="layout-main-mask"></div>
  <main class="layout-main" :style="mainStyle">
    <div class="main-box">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-slide" mode="out-in" appear>
          <keep-alive>
            <div class="content-box" :key="route.path">
              <component :is="Component" :key="route.path" />
            </div>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useLayoutStore } from '@/store'
const { mainStyle } = useLayoutStore()
</script>
<style scoped lang="scss">
.layout-main-mask {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  background-color: #f6f9f8;
  z-index: -1;
}
.layout-main {
  .main-box {
    padding: 16px;
    .content-box {
      box-shadow: 0 0 5px rgb(0 0 0 / 10%);
      background-color: #fff;
      padding: 16px;
      border-radius: 8px;
    }
  }
}
</style>
