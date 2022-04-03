<template>
  <LayoutList>
    <template v-slot:operation>
      <el-button type="primary" @click="goToAddEdit()">新增角色</el-button>
    </template>
    <template v-slot:search>
      <el-input v-model="listQuery.name">
        <template #prepend>请输入角色名</template>
      </el-input>
      <div class="btn-group">
        <el-button type="primary" @click="getList(true)">搜索</el-button>
        <el-button @click="init()">重置</el-button>
      </div>
    </template>
    <ComTable :data="list" v-loading="loading">
      <el-table-column prop="name" label="角色名" />
      <el-table-column prop="state" label="状态">
        <template v-slot="{ row }">
          <el-tag :type="row.state === 1 ? 'success' : 'danger'">{{ row.state === 1 ? '启用' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="text" v-if="row.id !== '1'">授权</el-button>
          <el-button type="text" v-if="row.id !== '1'" @click="goToAddEdit(row.id, 'edit')">编辑</el-button>
          <el-button type="text" v-if="row.id !== '1'" class="delete" @click="delItem(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </ComTable>
    <ComPage v-model="page" @change-page="getList()"></ComPage>
  </LayoutList>
</template>
<script setup lang="ts">
import { getRoleListApi, delRoleApi } from '@/apis/system/role'
import listModel from '@/model/listModel'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
// 定义查询参数
const defaultListQuery = {
  name: ''
}
const { state, getList, init, delItem } = listModel(defaultListQuery, getRoleListApi, delRoleApi)
const { loading, list, page, listQuery } = toRefs(state)
const router = useRouter()
// 调整到新增、编辑、详情
const goToAddEdit = (id = '', type = 'add') => {
  const r = {
    path: '/myapp/system/role/add-edit',
    query: {
      bcName: '新增角色',
      type,
      id
    }
  }
  if (type === 'edit') {
    r.query.bcName = '编辑角色'
  } else if (type === 'detail') {
    r.query.bcName = '角色详情'
  }
  router.push(r)
}
init()
</script>
