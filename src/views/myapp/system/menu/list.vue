<template>
  <div class="list-search">
    <el-input v-model="listQuery.name">
      <template #prepend>请输入用户名</template>
    </el-input>
    <div class="btn-group">
      <el-button @click="getList(true)">搜索</el-button>
      <el-button @click="init()">重置</el-button>
    </div>
  </div>
  <ComTable :data="list" v-loading="loading">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="icon" label="图标" />
  </ComTable>
  <ComPage v-model="page" @change-page="getList()"></ComPage>
</template>
<script setup lang="ts">
import { getMenuListApi } from '@/apis/system/menu'
import listModel from '@/model/listModel'
import { toRefs } from 'vue'
// 定义查询参数
const defaultListQuery = {
  name: ''
}
const { state, getList, init } = listModel(defaultListQuery, getMenuListApi)
const { loading, list, page, listQuery } = toRefs(state)
console.log(page.value)
init()
</script>
