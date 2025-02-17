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
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks/list',
    component: () => import('@/views/Task/TaskList.vue')
  },
  {
    path: '/tasks/create',
    component: () => import('@/views/Task/TaskCreate.vue')
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