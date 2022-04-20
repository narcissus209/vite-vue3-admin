<template>
  <LayoutList>
    <template v-slot:operation>
      <el-button type="primary" @click="goToAED()">新增账号</el-button>
    </template>
    <template v-slot:search>
      <el-input v-model="queryForm.name">
        <template #prepend>请输入用户名</template>
      </el-input>
      <div class="btn-group">
        <el-button type="primary" @click="search(true)">搜索</el-button>
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
          <el-button type="text" @click="goToAED(row.id, 'detail')">详情</el-button>
          <el-button type="text" @click="goToAED(row.id, 'edit')">编辑</el-button>
          <el-button class="delete" type="text" @click="delItem(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </ComTable>
    <ComPage v-model="page" @change-page="search()"></ComPage>
  </LayoutList>
</template>
<script setup lang="ts">
import { getAccountListApi, delAccountApi } from '@/apis/system/account'
import listModel from '@/model/listModel'
import { toRefs } from 'vue'

const options: IListOptions = {
  defaultQuery: {
    name: ''
  },
  queryListApi: getAccountListApi,
  delItemApi: delAccountApi,
  // 新增编辑详情的参数
  routeParams: {
    path: '/myapp/system/account/add-edit',
    addBcName: '新增账号',
    editBcName: '编辑账号',
    detailBcName: '账号详情'
  }
}
const { state, init, search, delItem, goToAED } = listModel(options)
const { loading, list, page, queryForm } = toRefs(state)
init()
</script>
