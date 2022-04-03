import { accountList } from './mockData'
import type { MockMethod } from 'vite-plugin-mock'
import { mock } from 'mockjs'
import { detail as roleDetail } from './role'

const getList = (query: any) => {
  query.page = Number(query.page) || 1
  query.size = Number(query.size) || 10
  const start = (query.page - 1) * query.size
  const end = query.page * query.size
  const allList = query.name ? accountList.filter((el: any) => el.name.includes(query.name)) : accountList
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
  accountList.unshift({
    ...data,
    role: roleDetail(data.roleId),
    createTime: mock('@datetime'),
    id: mock('@id')
  })
}
const update = (data: any) => {
  for (let i = 0; i < accountList.length; i++) {
    if (accountList[i].id === data.id) {
      accountList[i] = {
        ...accountList[i],
        ...data
      }
      return
    }
  }
}
const detail = (id: any) => {
  for (let i = 0; i < accountList.length; i++) {
    if (accountList[i].id === id) {
      const detailInfo = JSON.parse(JSON.stringify(accountList[i]))
      detailInfo.roleId = detailInfo.role.id
      return detailInfo
    }
  }
  return ''
}

const del = (id: any) => {
  for (let i = 0; i < accountList.length; i++) {
    if (accountList[i].id === id) {
      accountList.splice(i, 1)
    }
  }
}

const apis: MockMethod[] = [
  {
    url: '/mock/account', // 列表
    method: 'get',
    response: (req: any): any => {
      return {
        code: 200,
        data: getList(req.query)
      }
    }
  },
  {
    url: '/mock/account/:id', // 详情
    method: 'get',
    response: (req: any): any => {
      return {
        code: 200,
        data: detail(req.query.id)
      }
    }
  },
  {
    url: '/mock/account', // 新增
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
    url: '/mock/account', // 修改
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
    url: '/mock/account/:id', // 删除
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
