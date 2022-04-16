declare namespace Router {
  import { RawRouteComponent, RouteRecordRedirectOption } from 'vue-router'

  type Component = RawRouteComponent
  // 页面类型: 菜单 菜单视图 视图
  type menuType = 'menu' | 'menuView' | 'view'

  type meta = {
    title: string // 页面标题
    type?: menuType // 页面类型: 菜单 菜单视图 视图
    icon?: string // 图标
    hide?: boolean // 是否隐藏菜单，true 隐藏菜单，默认false
    hideTab?: boolean // 是否隐藏tabbar，true 隐藏，默认false
  }

  interface IRoute {
    name: string
    path: string
    redirect?: RouteRecordRedirectOption
    component?: RawRouteComponent
    meta: meta
    children?: IRoute[]
  }
}
