import { defineStore } from 'pinia'

interface layoutStore {
  asideWidth: number // 菜单栏宽度
  headerPosition: 'fixed' | 'absolute' // 顶部定位方式
  headerHeight: number // 顶部高度
  tabbarShow: boolean
  tabbarHeight: number // tabbar高度
  footerHeight: number // 底部高度
  footerPosition: 'fixed' | 'static' // 底部定位方式
  footerShow: boolean
  tags: {
    list: ITags[]
  }
}

export const useLayoutStore = defineStore('layout-store', {
  state: (): layoutStore => ({
    asideWidth: 220,
    headerPosition: 'fixed',
    headerHeight: 56,
    tabbarShow: true,
    tabbarHeight: 44,
    footerHeight: 48,
    footerPosition: 'fixed',
    footerShow: true,
    tags: {
      list: []
    }
  }),
  getters: {
    asideStyle(state) {
      return {
        width: `${state.asideWidth}px`,
        'min-width': `${state.asideWidth}px`
      }
    },
    headerStyle(state) {
      return {
        position: state.headerPosition,
        'padding-left': `${state.asideWidth}px`,
        height: `${state.headerHeight}px`,
        'min-height': `${state.headerHeight}px`,
        top: 0
      }
    },
    tabbarStyle(state) {
      return {
        position: state.headerPosition,
        'padding-left': `${state.asideWidth}px`,
        height: `${state.tabbarHeight}px`,
        'min-height': `${state.tabbarHeight}px`,
        top: `${state.headerHeight}px`
      }
    },
    footerStyle(state) {
      return {
        position: state.footerPosition,
        'padding-left': `${state.asideWidth}px`,
        height: `${state.footerHeight}px`,
        'min-height': `${state.footerHeight}px`,
        bottom: 0
      }
    },
    mainStyle(state) {
      return {
        'margin-left': `${state.asideWidth}px`,
        'padding-top': `${state.headerHeight + (state.tabbarShow ? state.tabbarHeight : 0)}px`,
        'padding-bottom': `${state.footerShow && state.footerPosition === 'fixed' ? state.footerHeight : 0}px`
      }
    }
  },
  actions: {
    // 添加tags list
    addTagsList(route: Router.Route) {
      this.tags.list.forEach(el => {
        if (el.path === route.path) {
          el.isActive = true
        } else {
          el.isActive = false
        }
      })
      if (!route.meta.hideTab) {
        if (!this.tags.list.find(el => el.path === route.path)) {
          this.tags.list.push({
            title: route.meta.title,
            path: route.path,
            isActive: true
          })
        }
      }
    },
    closeTag(i: number) {
      this.tags.list.splice(i, 1)
    }
  }
})
