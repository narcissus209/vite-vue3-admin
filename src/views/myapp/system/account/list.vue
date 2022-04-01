<template>
  <LayoutList>
    <template v-slot:operation>
      <el-button type="primary" @click="goToAddEdit()">新增账号</el-button>
    </template>
    <template v-slot:search>
      <el-input v-model="listQuery.name">
        <template #prepend>请输入用户名</template>
      </el-input>
      <div class="btn-group">
        <el-button type="primary" @click="getList(true)">搜索</el-button>
        <el-button @click="init()">重置</el-button>
      </div>
    </template>
    <ComTable :data="list" v-loading="loading">
      <el-table-column prop="name" label="用户名" />
      <el-table-column label="角色">
        <template v-slot="{ row }">
          <span>{{ row.role.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="createTime" label="创建时间" width="170" />
      <el-table-column label="操作" width="170">
        <template v-slot="{ row }">
          <el-button type="text" @click="goToAddEdit(row.id, 'detail')">详情</el-button>
          <el-button type="text" @click="goToAddEdit(row.id, 'edit')">编辑</el-button>
          <el-button class="delete" type="text" @click="delItem(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </ComTable>
    <ComPage v-model:page="page" @change-page="getList()"></ComPage>
  </LayoutList>
</template>
<script setup lang="ts">
import { getAccountListApi, delAccountApi } from '@/apis/system/account'
import listModel from '@/model/listModel'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
// 定义查询参数
const defaultListQuery = {
  name: ''
}
const { state, getList, init, delItem } = listModel(defaultListQuery, getAccountListApi, delAccountApi)
const { loading, list, page, listQuery } = toRefs(state)
const router = useRouter()
// 调整到新增、编辑、详情
const goToAddEdit = (id = '', type = 'add') => {
  const r = {
    path: '/myapp/system/account/add-edit',
    query: {
      bcName: '新增账号',
      type,
      id
    }
  }
  if (type === 'edit') {
    r.query.bcName = '编辑账号'
  } else if (type === 'detail') {
    r.query.bcName = '账号详情'
  }
  router.push(r)
}
init()
</script>
