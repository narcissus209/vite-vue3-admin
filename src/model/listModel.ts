import { reactive } from 'vue'
import { cloneDeep } from '@/utils'
const DefaultPage: IPage = {
  page: 1,
  size: 10,
  total: 0
}
export default function listModel(listQuery: any, queryListApi: (params: any) => any, delItemApi?: (id: number) => void) {
  const state: {
    list: any[]
    loading: boolean
    page: IPage
    listQuery: any
  } = reactive({
    list: [],
    loading: false,
    page: cloneDeep(DefaultPage),
    listQuery: cloneDeep(listQuery)
  })
  const init = () => {
    state.page = cloneDeep(DefaultPage)
    state.listQuery = cloneDeep(listQuery)
    getList()
  }
  const getList = async (isSearch = false) => {
    state.loading = true
    if (isSearch) {
      state.page.page = 1
    }
    const res = await queryListApi({ ...state.listQuery, ...state.page })
    state.list = res.data.list
    state.page.total = res.data.total
    state.loading = false
  }
  const delItem = async (id: number) => {
    if (delItemApi) {
      await delItemApi(id)
      await getList()
    }
  }
  return { state, init, getList, delItem }
}
