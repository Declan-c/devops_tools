import api from './client'

// 类型定义
interface Role {
  id: number
  name: string
}

interface RegisterData {
  username: string
  password: string
  email: string
  phone: string
  roles: string
}

export interface LoginData {
  username: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export const authApi = {
  login: (data: LoginData) => 
    api.post<TokenResponse>('/auth/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }),
  
  // 获取用户信息
  getProfile() {
    return api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  
  // 获取角色列表
  getRoles: () => api.get<Role[]>('/roles'),
  
  // 提交注册
  register: (data: RegisterData) => api.post('/register', data)
}