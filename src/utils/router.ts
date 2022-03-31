const components: IObject<Router.Component> = {
  Layout: (() => import('@/layout/index.vue')) as unknown as Router.Component
}

export const generatorRoutes = (data: Router.Route[]): Router.Route[] => {
  const routes: Router.Route[] = []
  data.forEach((el: Router.Route) => {
    const route = setRoute(el)
    if (el.children && el.children.length) {
      route.children = generatorRoutes(el.children)
    }
    routes.push(route)
  })
  return routes
}

const setRoute = (r: Router.Route) => {
  const route: Router.Route = {
    name: r.name,
    path: '/' + r.name.replaceAll('_', '/'),
    component: components[r.name],
    meta: {
      title: r.title,
      icon: r.icon || '',
      hide: r.hide || false
    }
  }
  return route
}
