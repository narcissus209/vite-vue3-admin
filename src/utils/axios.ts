import axios from 'axios'
import { getToken } from '@/utils/auth'
import { SERVE } from '@/apis/service'
import { useUserStore } from '@/store'
import router from '@/router'

const _axios = axios.create({
  baseURL: SERVE,
  timeout: 10000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
})

_axios.interceptors.request.use(
  function (config) {
    const token = getToken()
    config.headers && (config.headers.Authorization = token)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (res) {
    if (res.status === 200) {
      // 下载文件
      if (res.config.responseType && res.config.responseType.toLowerCase() === 'blob') {
        return res.data
      } else {
        return res.data
      }
    }
    return Promise.reject(res)
  },
  async function (error) {
    const response = error.response
    if (response.status === 401) {
      // 登录失效
      const { logout } = useUserStore()
      const path = await logout()
      router.push(path)
    }
    return Promise.reject(error)
  }
)

export default _axios
