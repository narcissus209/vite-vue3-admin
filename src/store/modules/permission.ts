import { defineStore } from 'pinia'
import { getPermissionMenuApi } from '@/apis/user'
import { components } from '@/router/asyncRoutes'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

const createMenu = (menuTree: Menu.IMenu[]): Router.IRoute[] => {
  const routes: Router.IRoute[] = []
  menuTree.forEach((menu: Menu.IMenu) => {
    const route: Router.IRoute = {
      name: menu.name,
      path: '/' + menu.name.replaceAll('_', '/'),
      component: menu.type === 'menu' || menu.type === 'menuView' ? components['routerView'] : components[menu.name],
      meta: {
        type: menu.type,
        title: menu.title,
        icon: menu.icon || '',
        hide: menu.hide || false,
        hideTab: menu.hideTab || false
      }
    }
    if (menu.children && menu.children.length) {
      route.children = createMenu(menu.children)
      route.redirect = { name: route.children[0].name }
    }
    if (!route.component) {
      route.redirect = '/404'
    }
    routes.push(route)
  })
  return routes
}

export const usePermissionStore = defineStore('permission-store', {
  state: (): { menu: Router.IRoute[] } => ({
    menu: []
  }),
  getters: {
    hasMenu(state) {
      return state.menu.length
    }
  },
  actions: {
    async generateRoutes() {
      const res = await getPermissionMenuApi()
      const accessedRoutes = createMenu(res.data.menu)
      this.menu = accessedRoutes
      const newRoutes: Router.IRoute[] = [
        {
          name: 'home',
          path: '/',
          redirect: '/myapp',
          meta: { title: 'home' }
        },
        {
          name: 'myapp',
          path: '/myapp',
          component: components['layout'],
          redirect: { name: accessedRoutes[0].name },
          meta: { title: 'myapp' },
          children: accessedRoutes
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'end404',
          redirect: '/404',
          meta: { title: '404' }
        }
      ]
      newRoutes.forEach(route => {
        router.addRoute(route as RouteRecordRaw)
      })
      return true
    }
  }
})
