import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'

interface User {
  id: string
  username: string
  roles: string[]
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || ''
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.roles.includes('admin')
  },

  actions: {
    async login(credentials: { username: string; password: string }) {
      const { data } = await authApi.login(credentials)
      this.token = data.access_token
      localStorage.setItem('token', data.access_token)
      await this.fetchProfile()
    },

    async fetchProfile() {
      try {
        const { data } = await authApi.getProfile()
        this.user = data
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('token')
      location.reload()
    }
  }
})