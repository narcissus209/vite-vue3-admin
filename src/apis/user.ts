import http from '@/utils/axios'

export const loginApi = (data: any): any => {
  console.log(data)
  return {
    code: 200,
    data: {
      token: '123',
      name: '222'
    }
  }
}

export const logoutApi = (): any => {
  return {
    code: 200,
    data: {}
  }
}

export const getPermissionMenuApi = () => {
  return http('/mock/permission', {
    method: 'get'
  })
}
