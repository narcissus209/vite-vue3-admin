import Layout from '@/layout/index.vue'

const constantRoutes: Router.IRoute[] = [
  {
    name: 'home',
    path: '/',
    redirect: '/myapp',
    meta: { title: 'home' }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/base/login.vue'),
    meta: {
      title: '登录',
      hide: true
    }
  },
  {
    name: 'forget-password',
    path: '/forget-password',
    component: () => import('@/views/base/forget-password.vue'),
    meta: {
      title: '忘记密码',
      hide: true
    }
  },
  {
    name: 'error',
    path: '/error',
    component: Layout,
    redirect: '/404',
    meta: { title: 'error' },
    children: [
      {
        name: '401',
        path: '/401',
        component: () => import('@/views/base/401.vue'),
        meta: {
          title: '无权限',
          hideTab: true
        }
      },
      {
        name: '404',
        path: '/404',
        component: () => import('@/views/base/404.vue'),
        meta: {
          title: '未找到',
          hideTab: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'end404',
    redirect: '/404',
    meta: { title: 'end404' }
  }
]

export default constantRoutes
