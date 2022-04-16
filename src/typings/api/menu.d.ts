declare namespace Menu {
  type Pids = Array<string | number>

  interface IMenu {
    id: string | number
    pid?: string | number
    name: string // 路由名称
    title: string // 页面标题
    type: Router.menuType // 页面类型: 菜单 菜单视图 视图
    sort: number // 排序
    icon?: string // 图标
    hide?: boolean // 是否隐藏菜单，true 隐藏菜单，默认false
    hideTab?: boolean // 是否隐藏tabbar，true 隐藏，默认false
    children?: IMenu[]
  }

  interface IForm {
    id?: string | number
    title: string // 页面标题
    name: string // 路由名称
    type: Router.menuType // 页面类型: 菜单 菜单视图 视图
    sort: number // 排序
    icon: string // 图标
    hide: boolean // 是否隐藏菜单，true 隐藏菜单，默认false
    hideTab: boolean // 是否隐藏tabbar，true 隐藏，默认false
    pids: Pids
  }
}
