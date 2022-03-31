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

const apis: MockMethod[] = [
  {
    url: '/mock/menu',
    method: 'get',
    response: (): any => {
      return {
        code: 200,
        data: {
          list: menuList,
          total: menuList.length
        }
      }
    }
  },
  {
    url: '/mock/permission',
    method: 'get',
    response: (): any => {
      return {
        code: 200,
        data: {
          menu: menuList
        }
      }
    }
  }
]

export default apis
