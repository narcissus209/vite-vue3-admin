import { mock, Random } from 'mockjs'

// 角色
const Admin = {
  id: '1',
  name: '超级管理员',
  createTime: '2022-02-22 22:22:22',
  state: 1
}
export const roleList = [
  {
    id: '2',
    name: '运维人员',
    createTime: '2022-02-22 22:22:22',
    state: 1
  },
  {
    id: '3',
    name: '主管',
    createTime: '2022-02-22 22:22:22',
    state: 1
  },
  Admin
]

// 账号
const account = mock({
  'list|20-40': [
    {
      id: '@id',
      'role|1': roleList,
      name: '@name',
      phone: /^1[34578]\d{9}$/, //随机电话号码
      email: '@email', //随机邮箱
      'password|8-16': /[a-zA-Z0-9]/,
      createTime: '@datetime', //创建时间
      avatar: Random.image('100×100', '#FF6600', '#333333', 'png', '头像')
    }
  ]
})
const myAccount = [
  {
    id: '1',
    role: Admin,
    name: '超级管理员',
    phone: /^1[34578]\d{9}$/, //随机电话号码
    email: '@email', //随机邮箱
    password: '123456789',
    createTime: '2022-02-22 22:22:22',
    avatar: Random.image('100×100', '#FF6600', '#333333', 'png', '超级管理员')
  }
]
export const accountList = account.list.concat(myAccount)

// 员工
const staff = mock({
  'list|50-100': [
    {
      id: '@id',
      name: '@cname',
      phone: /^1[34578]\d{9}$/, //随机电话号码
      'age|20-50': 1, //年龄
      address: '@county(true)', //随机地址
      email: '@email', //随机邮箱
      'gender|0-1': 1, //随机性别
      createTime: '@datetime', //创建时间
      avatar: Random.image('100×100', '#FF6600', '#333333', 'png', '头像')
    }
  ]
})

export const staffList = staff.list

// 菜单
export const menuList: Menu.IMenu[] = [
  {
    id: '10000',
    name: 'myapp_system',
    title: '系统设置',
    type: 'menu',
    icon: 'system',
    sort: 10
  },
  {
    id: '10004',
    pid: '10000',
    name: 'myapp_system_account',
    title: '账号管理',
    type: 'menuView',
    icon: 'account',
    sort: 1
  },
  {
    id: '10005',
    pid: '10004',
    name: 'myapp_system_account_list',
    title: '账号管理',
    type: 'view',
    sort: 1
  },
  {
    id: '10006',
    pid: '10004',
    name: 'myapp_system_account_add-edit',
    title: '新增编辑账号',
    type: 'view',
    hideTab: true,
    sort: 2
  },
  {
    id: '10007',
    pid: '10000',
    name: 'myapp_system_menu',
    title: '菜单管理',
    type: 'menuView',
    icon: 'menu',
    sort: 2
  },
  {
    id: '10008',
    pid: '10007',
    name: 'myapp_system_menu_list',
    title: '菜单管理',
    type: 'view',
    sort: 1
  },
  {
    id: '10009',
    pid: '10007',
    name: 'myapp_system_menu_add-edit',
    title: '新增编辑菜单',
    type: 'view',
    hideTab: true,
    sort: 2
  },
  {
    id: '10010',
    pid: '10000',
    name: 'myapp_system_role',
    title: '角色管理',
    type: 'menuView',
    icon: 'role',
    sort: 3
  },
  {
    id: '10011',
    pid: '10010',
    name: 'myapp_system_role_list',
    title: '角色管理',
    type: 'view',
    sort: 1
  },
  {
    id: '10012',
    pid: '10010',
    name: 'myapp_system_role_add-edit',
    title: '新增编辑角色',
    type: 'view',
    hideTab: true,
    sort: 2
  },
  {
    id: '10001',
    pid: '10000',
    name: 'myapp_system_staff',
    title: '员工管理',
    type: 'menuView',
    icon: 'staff',
    sort: 5
  },
  {
    id: '10002',
    pid: '10001',
    name: 'myapp_system_staff_list',
    title: '员工管理',
    type: 'view',
    sort: 1
  },
  {
    id: '10003',
    pid: '10001',
    name: 'myapp_system_staff_add-edit',
    title: '新增编辑员工',
    type: 'view',
    hideTab: true,
    sort: 2
  }
]
