import { roleList } from './mockData'
import type { MockMethod } from 'vite-plugin-mock'
import { mock } from 'mockjs'

const getList = (query: any) => {
  query.page = Number(query.page) || 1
  query.size = Number(query.size) || 10
  const start = (query.page - 1) * query.size
  const end = query.page * query.size
  const allList = query.name ? roleList.filter((el: any) => el.name.includes(query.name)) : roleList
  const list = []
  for (let i = start; i < end && i < allList.length; i++) {
    list.push(allList[i])
  }
  return {
    list: list,
    total: allList.length
  }
}
const add = (data: any) => {
  roleList.unshift({
    ...data,
    id: mock('@id')
  })
}
const update = (data: any) => {
  for (let i = 0; i < roleList.length; i++) {
    if (roleList[i].id === data.id) {
      roleList[i] = {
        ...roleList[i],
        ...data
      }
      return
    }
  }
}
export const detail = (id: any) => {
  for (let i = 0; i < roleList.length; i++) {
    if (roleList[i].id === id) {
      return roleList[i]
    }
  }
  return ''
}

const del = (id: any) => {
  for (let i = 0; i < roleList.length; i++) {
    if (roleList[i].id === id) {
      roleList.splice(i, 1)
    }
  }
}

const apis: MockMethod[] = [
  {
    url: '/mock/role', // 列表
    method: 'get',
    response: (req: any): any => {
      return {
        code: 200,
        data: getList(req.query)
      }
    }
  },
  {
    url: '/mock/role/:id', // 详情
    method: 'get',
    response: (req: any): any => {
      return {
        code: 200,
        data: detail(req.query.id)
      }
    }
  },
  {
    url: '/mock/role', // 新增
    method: 'post',
    response: (req: any): any => {
      add(req.body)
      return {
        code: 200,
        data: {},
        message: '新增成功'
      }
    }
  },
  {
    url: '/mock/role', // 修改
    method: 'put',
    response: (req: any): any => {
      update(req.body)
      return {
        code: 200,
        data: {},
        message: '修改成功'
      }
    }
  },
  {
    url: '/mock/role/:id', // 修改
    method: 'delete',
    response: (req: any): any => {
      del(req.query.id)
      return {
        code: 200,
        data: {},
        message: '删除成功'
      }
    }
  }
]

export default apis
