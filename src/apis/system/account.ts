import http from '@/utils/axios'

export const getAccountListApi = (params: any) => {
  return http('/mock/account', {
    method: 'get',
    params
  })
}

export const getAccountDateilApi = (id: any) => {
  return http(`/mock/account/${id}`, {
    method: 'get'
  })
}

export const addAccounApi = (data: any) => {
  return http(`/mock/account`, {
    method: 'post',
    data
  })
}

export const editAccountApi = (data: any) => {
  return http(`/mock/account`, {
    method: 'put',
    data
  })
}

export const delAccountApi = (id: any) => {
  return http(`/mock/account/${id}`, {
    method: 'delete'
  })
}
