import http from '@/utils/axios'

export const getRoleListApi = (params: any) => {
  return http('/mock/role', {
    method: 'get',
    params
  })
}

export const getRoleDateilApi = (id: any) => {
  return http(`/mock/role/${id}`, {
    method: 'get'
  })
}

export const addRoleApi = (data: any) => {
  return http(`/mock/role`, {
    method: 'post',
    data
  })
}

export const editRoleApi = (data: any) => {
  return http(`/mock/role`, {
    method: 'put',
    data
  })
}

export const delRoleApi = (id: any) => {
  return http(`/mock/role/${id}`, {
    method: 'delete'
  })
}
