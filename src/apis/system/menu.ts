import http from '@/utils/axios'

export const getMenuListApi = () => {
  return http('/mock/menu', {
    method: 'get'
  })
}

export const getMenuDateilApi = (id: any) => {
  return http(`/mock/menu/${id}`, {
    method: 'get'
  })
}

export const addMenuApi = (data: any) => {
  return http(`/mock/menu`, {
    method: 'post',
    data
  })
}

export const editMenuApi = (data: any) => {
  return http(`/mock/menu`, {
    method: 'put',
    data
  })
}

export const delMenuApi = (id: any) => {
  return http(`/mock/menu/${id}`, {
    method: 'delete'
  })
}

export const getMenuParentApi = () => {
  return http(`/mock/menu/parent`, {
    method: 'get'
  })
}
