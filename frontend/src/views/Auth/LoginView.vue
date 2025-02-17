<template>
  <div class="login-view">
    <header class="main-header">
      <div class="header-left">
        <!-- <el-icon class="logo-icon" name="el-icon-s-opportunity" /> -->
        <h1 class="system-title">SRE智能运维平台</h1>
      </div>
      <div class="header-right">
        <el-tag type="success">帮助</el-tag>
      </div>
    </header>
    <div class="login-container">
      <el-card class="login-card">
        <div class="login-header">
          <h2>账号登陆</h2>
        </div>
        
        <el-form
          ref="loginForm"
          :model="form"
          :rules="rules"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              prefix-icon="User"
            />
          </el-form-item>
  
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>
  
          <el-form-item>
            <el-button 
              type="primary" 
              native-type="submit"
              :loading="loading"
              class="login-btn"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="register-container">
          <el-button class="register-btn" @click="goToRegister">还没有账号？去注册</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore'
  import { ElMessage } from 'element-plus'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const form = ref({
    username: '',
    password: ''
  })
  
  const loading = ref(false)
  
  const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }
  
  const handleLogin = async () => {
    try {
      loading.value = true
      await authStore.login(form.value)
      
      const redirect = router.currentRoute.value.query.redirect
      const path = typeof redirect === 'string' ? redirect : '/dashboard'
      await router.push(path)
      
      ElMessage.success('登录成功')
    } catch (error: any) {
      ElMessage.error(error.message || '登录失败')
    } finally {
      loading.value = false
    }
  }

  const goToRegister = () => {
    router.push('/register')
  }
  </script>
  
  <style scoped lang="scss">
  .login-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
  .main-header {
  height: 80px;
  background: #001529;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #002140;

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .system-title {
      margin: 0;
      font-size: 28px;
      font-weight: 550;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: auto;
  }
}
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f0f2f5;
  
    .login-card {
      width: 400px;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
      .login-header {
        // text-align: center;
        margin-bottom: 30px;
  
        h2 {
          color: #333;
          font-size: 24px;
        }
      }

      .login-btn {
        width: 100%;
        height: 40px;
        margin-top: 10px;
      }
    }
  }
  .register-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .register-btn {
    background-color: transparent;
    color: #333;
    border: none;
    cursor: pointer;
    display: flex;
  }

  .register-btn:hover {
    background-color: rgb(235.9, 245.3, 255);
    color: #409eff;
  }
  </style>