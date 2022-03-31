import { reactive } from 'vue'
import { cloneDeep } from '@/utils'
import { useRoute } from 'vue-router'

export default function formModel(formData: any, detailApi: (params: any) => any, addApi: (params: any) => any, editApi: (id: number) => any) {
  const route = useRoute()
  const state: {
    formData: any
    pageType: string
    id: string
  } = reactive({
    formData: cloneDeep(formData),
    pageType: String(route.query.type) || 'add',
    id: String(route.query.id) || ''
  })
  const init = async () => {
    if (route.query.id && (state.pageType === 'edit' || state.pageType === 'detail')) {
      const { data } = await detailApi(route.query.id)
      if (data.id) state.formData = cloneDeep(data)
    } else {
      state.formData = cloneDeep(formData)
    }
  }
  const saveApi = (data: any) => {
    if (state.pageType === 'edit' && state.id) {
      return editApi(data)
    } else {
      return addApi(data)
    }
  }
  return { state, init, saveApi }
}
