<template>
  <LayoutList>
    <template v-slot:operation>
      <el-button type="primary" @click="goToAddEdit()">新增菜单</el-button>
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
          <el-button type="text" @click="goToAddEdit(row.id, 'edit')">编辑</el-button>
          <el-button class="delete" type="text" @click="delItem(row.id)">删除</el-button>
          <el-button v-if="row.type !== 'view'" type="text" @click="goToAddEdit('', 'add', row.id)">新增子菜单</el-button>
        </template>
      </el-table-column>
    </ComTable>
  </LayoutList>
</template>
<script setup lang="ts">
import { getMenuListApi, delMenuApi } from '@/apis/system/menu'
import listModel from '@/model/listModel'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { typeMap } from './menuData'

const { state, init, delItem } = listModel({}, getMenuListApi, delMenuApi)
const { loading, list } = toRefs(state)
const router = useRouter()
// 调整到新增、编辑、详情
const goToAddEdit = (id = '', type = 'add', pid?: string) => {
  const r = {
    path: '/myapp/system/menu/add-edit',
    query: {
      bcName: '新增菜单',
      type,
      id,
      pid
    }
  }
  if (type === 'edit') {
    r.query.bcName = '编辑菜单'
  } else if (type === 'detail') {
    r.query.bcName = '菜单详情'
  }
  router.push(r)
}
init()
</script>
