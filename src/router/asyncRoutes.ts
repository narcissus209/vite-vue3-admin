const modules = import.meta.glob('../views/myapp/**/**.vue')
export const components: IObject<Router.Component> = {
  routerView: (() => import('@/layout/RouterView.vue')) as unknown as Router.Component,
  layout: (() => import('@/layout/index.vue')) as unknown as Router.Component
}
Object.keys(modules).forEach(key => {
  // 如果是局部组件，则跳过
  if (key.includes('_Components')) return
  const nameMatch = key.match(/\/views\/(.+)\.vue/)
  if (!nameMatch) return
  const name = nameMatch[1].replaceAll('/', '_')
  components[name] = modules[key] as Router.Component
})
