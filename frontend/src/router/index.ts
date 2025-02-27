import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Auth/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard/DashboardView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('@/views/Dashboard/HomeView.vue')
      },
      {
        path: 'tasks/list',
        name: 'TaskList',
        component: () => import('@/views/Task/TaskList.vue')
      },
      {
        path: 'tasks/create',
        name: 'TaskCreate',
        component: () => import('@/views/Task/TaskCreate.vue')
      },
      {
        path: 'tasks/report',
        name: 'TaskReport',
        component: () => import('@/views/Dashboard/ReportView.vue')
      },
      {
        path: 'opreter',
        name: 'Opreter',
        component: () => import('@/views/Dashboard/OpreterView.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // 登录状态检查
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (authStore.isAuthenticated) {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router