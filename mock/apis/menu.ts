/*
{
  name, // *
  title, // *
  type, // * 菜单类型 menu menuView view
  icon, // 图标
  hideTab, // 是否隐藏 tab 选项卡，默认false，需要隐藏设置true
}
*/
import type { MockMethod } from 'vite-plugin-mock'
import { menuList } from './mockData'
import { mock } from 'mockjs'

const arr2tree = (source: any, id = 'id', pid = 'parentId'): any => {
  const treeData: any = []
  if (!Array.isArray(source)) return treeData
  const data = JSON.parse(JSON.stringify(source))
  data.forEach((item: any) => {
    delete item.children
  })
  const map: any = {}
  data.forEach((item: any) => {
    map[item[id]] = item
  })
  data.forEach((item: any) => {
    if (!item[pid] || item[pid] === '0') {
      treeData.push(item)
    } else {
      const parent = map[item[pid]]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }
  })
  return treeData
}
export const compare = (property?: any, type = true) => {
  return function (a: any, b: any) {
    if (property) {
      return type ? a[property] - b[property] : b[property] - a[property]
    } else {
      return type ? a - b : b - a
    }
  }
}

const getList = () => {
  menuList.sort(compare('sort'))
  const tree = arr2tree(menuList, 'id', 'pid')
  return {
    list: tree,
    total: tree.length
  }
}
const add = (data: any) => {
  menuList.unshift({
    ...data,
    id: mock('@id')
  })
}
const update = (data: any) => {
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].id === data.id) {
      let pid = ''
      if (data.pids && data.pids.length) {
        pid = data.pids[data.pids.length - 1]
      }
      menuList[i] = {
        ...menuList[i],
        ...data,
        pid: pid
      }
      return
    }
  }
}
const getPids = (pid: string) => {
  if (!pid) return []
  const pids = [pid]
  let newPid = pid
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].id === newPid) {
      if (!menuList[i].pid) {
        return pids
      }
      pids.unshift(menuList[i].pid as string)
      newPid = menuList[i].pid as string
      i = -1
    }
  }
  return pids
}
const detail = (id: any) => {
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].id === id) {
      const detailInfo = JSON.parse(JSON.stringify(menuList[i]))
      detailInfo.pids = getPids(detailInfo.pid)
      return detailInfo
    }
  }
  return ''
}
const del = (id: any) => {
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].id === id) {
      menuList.splice(i, 1)
    }
  }
}
const permission = () => {
  const tree = arr2tree(menuList, 'id', 'pid')
  return tree
}
const parentMenuTree = () => {
  const parentMenuList = menuList.filter(el => el.type !== 'view')
  const tree = arr2tree(parentMenuList, 'id', 'pid')
  return tree
}

const apis: MockMethod[] = [
  {
    url: '/mock/menu',
    method: 'get',
    response: (): any => {
      const data = getList()
      return {
        code: 200,
        data: data
      }
    }
  },
  {
    url: '/mock/menu/parent',
    method: 'get',
    response: (): any => {
      const menuTree = parentMenuTree()
      return {
        code: 200,
        data: menuTree
      }
    }
  },
  {
    url: '/mock/menu/:id', // 详情
    method: 'get',
    response: (req: any): any => {
      return {
        code: 200,
        data: detail(req.query.id)
      }
    }
  },
  {
    url: '/mock/menu', // 新增
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
    url: '/mock/menu', // 修改
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
    url: '/mock/menu/:id', // 删除
    method: 'delete',
    response: (req: any): any => {
      del(req.query.id)
      return {
        code: 200,
        data: {},
        message: '删除成功'
      }
    }
  },
  {
    url: '/mock/permission',
    method: 'get',
    response: (): any => {
      const menuTree = permission()
      return {
        code: 200,
        data: {
          menu: menuTree
        }
      }
    }
  }
]

export default apis
