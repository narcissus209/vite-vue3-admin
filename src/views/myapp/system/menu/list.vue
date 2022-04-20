<template>
  <LayoutList>
    <template v-slot:operation>
      <el-button type="primary" @click="goToAED()">新增菜单</el-button>
    </template>
    <ComTable :data="list" v-loading="loading" row-key="id">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="type" label="类型">
        <template v-slot="{ row }">
          <el-tag :type="typeMap[row.type].type">{{ typeMap[row.type].span }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标" />
      <el-table-column prop="sort" label="权重" />
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <el-button type="text" @click="goToAED(row.id, 'edit')">编辑</el-button>
          <el-button class="delete" type="text" @click="delItem(row.id)">删除</el-button>
          <el-button v-if="row.type !== 'view'" type="text" @click="goToAED('', 'add', { pid: row.id })">新增子菜单</el-button>
        </template>
      </el-table-column>
    </ComTable>
  </LayoutList>
</template>
<script setup lang="ts">
import { getMenuListApi, delMenuApi } from '@/apis/system/menu'
import listModel from '@/model/listModel'
import { toRefs } from 'vue'
import { typeMap } from './menuData'
const options: IListOptions = {
  defaultQuery: {},
  queryListApi: getMenuListApi,
  delItemApi: delMenuApi,
  // 新增编辑详情的参数
  routeParams: {
    path: '/myapp/system/menu/add-edit',
    addBcName: '新增菜单',
    editBcName: '编辑菜单',
    detailBcName: '菜单详情'
  }
}
const { state, init, delItem, goToAED } = listModel(options)
const { loading, list } = toRefs(state)
init()
</script>
