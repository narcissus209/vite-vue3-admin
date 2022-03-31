import { defineStore } from 'pinia'
import { getPermissionMenuApi } from '@/apis/user'
import { components } from '@/router/asyncRoutes'
import router from '@/router'

const createMenu = (data: Router.Route) => {
  const routes: Router.Route[] = []
  data.forEach((r: Router.Route) => {
    const route: Router.Route = {
      name: r.name,
      path: '/' + r.name.replaceAll('_', '/'),
      component: r.type === 'menu' || r.type === 'menuView' ? components['routerView'] : components[r.name],
      meta: {
        type: r.type,
        title: r.title,
        icon: r.icon || '',
        hide: r.hide || false,
        hideTab: r.hideTab || false
      }
    }
    if (r.children && r.children.length) {
      route.children = createMenu(r.children)
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
  state: (): { menu: Router.Route[] } => ({
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
      const newRoutes: Router.Route[] = [
        {
          name: 'home',
          path: '/',
          redirect: '/myapp'
        },
        {
          name: 'myapp',
          path: '/myapp',
          component: components['layout'],
          redirect: { name: accessedRoutes[0].name },
          children: accessedRoutes
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'end404',
          redirect: '/404'
        }
      ]
      newRoutes.forEach(route => {
        router.addRoute(route)
      })
      return true
    }
  }
})
