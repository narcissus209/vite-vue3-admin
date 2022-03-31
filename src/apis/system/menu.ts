import http from '@/utils/axios'

export const getMenuListApi = () => {
  return http('/mock/menu', {
    method: 'get'
  })
}
