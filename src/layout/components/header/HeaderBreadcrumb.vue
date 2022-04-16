<template>
  <el-breadcrumb class="header-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in data.breadcrumbList" :key="item.path" :to="item.path">{{ item.title }}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch, reactive } from 'vue'

const getBreadcrumbList = (route: Router.IRoute) => {
  let breadcrumbList: Router.IRoute[] = []
  const matchedArr = route.matched
  const len = matchedArr.length
  if (len > 1) {
    for (let i = 1; i <= len - 2; i++) {
      breadcrumbList.push({
        path: matchedArr[i].path,
        title: matchedArr[i].meta.title
      })
    }
    if (route.query.bcName || route.meta.title) {
      breadcrumbList.push({
        path: route.path,
        title: route.query.bcName || route.meta.title
      })
    }
  } else {
    breadcrumbList = []
  }
  return breadcrumbList
}
const route = useRoute()
const data = reactive({
  breadcrumbList: getBreadcrumbList(route)
})

watch(
  () => route.path,
  () => {
    data.breadcrumbList = getBreadcrumbList(route)
  }
)
</script>
<style lang="scss" scoped>
.header-breadcrumb {
  display: flex;
  align-items: center;
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all 0.5s;
  }

  .breadcrumb-enter-from,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all 0.5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
}
</style>
