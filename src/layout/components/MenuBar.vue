<template>
  <div v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.meta.type === 'menu'" :index="menu.path">
      <template #title>
        <MenuTitle :title="menu.meta.title" :icon="menu.meta.icon"></MenuTitle>
      </template>
      <MenuBar :menu-list="menu.children"></MenuBar>
    </el-sub-menu>
    <el-menu-item v-else-if="menu.meta.type === 'menuView'" :index="menu.path" @click="go(menu)">
      <MenuTitle :title="menu.meta.title" :icon="menu.meta.icon"></MenuTitle>
    </el-menu-item>
  </div>
</template>
<script setup lang="ts">
import MenuTitle from './MenuTitle.vue'
import { useRouter } from 'vue-router'

interface Props {
  menuList: Router.Route[]
}
defineProps<Props>()

const router = useRouter()
const go = (menu: Router.Route) => {
  router.push(menu.path)
}
</script>
