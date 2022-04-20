import { reactive } from 'vue'
import { cloneDeep } from '@/utils'
import { useRouter } from 'vue-router'

const DefaultPage: IPage = {
  page: 1,
  size: 10,
  total: 0
}
type anyObj = {
  [key: string]: any
}

export default function listModel({ defaultQuery, setParams, queryListApi, delItemApi, routeParams }: IListOptions) {
  const state: {
    list: any[]
    loading: boolean
    page: IPage
    queryForm: any
  } = reactive({
    list: [],
    loading: false,
    page: cloneDeep(DefaultPage),
    queryForm: cloneDeep(defaultQuery)
  })
  /**
   * 初始化
   */
  const init = () => {
    state.page = cloneDeep(DefaultPage)
    state.queryForm = cloneDeep(defaultQuery)
    search()
  }
  const _setParams = () => {
    let params: any = {}
    if (setParams) {
      params = setParams()
    }
    return { ...state.queryForm, ...state.page, ...params }
  }
  /**
   * 搜索
   * @param isSearch true: 将页码调整为1，false不处理
   */
  const search = async (isSearch = false) => {
    state.loading = true
    if (isSearch) {
      state.page.page = 1
    }
    const params = _setParams()
    const res = await queryListApi(params)
    state.list = res.data.list
    state.page.total = res.data.total
    state.loading = false
  }
  /**
   * 删除
   * @param id number | string 必穿
   */
  const delItem = async (id: number | string) => {
    if (delItemApi) {
      await delItemApi(id)
      await search()
    }
  }

  const router = useRouter()
  type typeEmun = 'add' | 'edit' | 'detail'
  /**
   * 跳转到新增编辑或详情页面
   * @param id 详情和编辑需要传入id
   * @param type 'add' | 'edit' | 'detail'
   * @param query 其他需要传入的参数
   */
  const goToAED = (id: string | number = '', type: typeEmun = 'add', query: anyObj = {}) => {
    if (routeParams) {
      interface INewRoute {
        path: string
        query: any
      }
      const r: INewRoute = {
        path: routeParams.path,
        query: {
          ...query
        }
      }
      id && (r.query.id = id)
      if (type === 'add') {
        routeParams.addBcName && (r.query.bcName = routeParams.addBcName)
      } else if (type === 'edit') {
        routeParams.editBcName && (r.query.bcName = routeParams.editBcName)
      } else if (type === 'detail') {
        routeParams.detailBcName && (r.query.bcName = routeParams.detailBcName)
      }
      router.push(r)
    }
  }
  return { state, init, search, delItem, goToAED }
}
