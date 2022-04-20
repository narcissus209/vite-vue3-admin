export {}

declare global {
  interface IObject<T> {
    [index: string]: T
  }
  interface ITags {
    title: string
    path: string
    isActive: boolean
  }
  interface IPage {
    page: number
    size: number
    total?: number
  }
  type anyObj = {
    [key: string]: any
  }
  interface IListOptions {
    defaultQuery: anyObj
    setParams?: () => anyObj
    queryListApi: (params: any) => any
    delItemApi?: (id: number | string) => any
    // 新增编辑详情的参数
    routeParams?: {
      path: string
      addPath?: string
      editPath?: string
      detailPath?: string
      addBcName?: string
      editBcName?: string
      detailBcName?: string
    }
  }
}
