<template>
    <div class="register-container">
      <el-form
        ref="registerForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="register-form"
      >
        <h2 class="form-title">用户注册</h2>
        
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            clearable
            prefix-icon="User"
          >
          </el-input>
        </el-form-item>
  
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="至少8位，包含大写字母和数字"
            show-password
            prefix-icon="Lock"
          >
          </el-input>
        </el-form-item>
  
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            clearable
            prefix-icon="Message"
          >
          </el-input>
        </el-form-item>
  
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            clearable
            prefix-icon="Iphone"
          >
          </el-input>
        </el-form-item>
  
        <el-form-item label="选择角色" prop="roles">
          <el-select
            v-model="form.roles"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option
              v-for="role in roleOptions"
              :key="role.id"
              :label="role.name"
              :value="role.name"
            />
            <template #prefix>
              <el-icon><Roles /></el-icon>
            </template>
          </el-select>
        </el-form-item>
  
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
            :loading="loading"
            class="submit-btn"
          >
            立即注册
          </el-button>
        </el-form-item>
        <div class="login-container">
          <el-button class="login-btn" @click="goToLogin">已有账号？去登录</el-button>
        </div>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { authApi } from '@/api/auth'
  
  const router = useRouter()
  
  // 表单数据
  const form = ref({
    username: '',
    password: '',
    email: '',
    phone: '',
    roles: ''
  })
  
  // 角色选项
  const roleOptions = ref([])
  
  // 加载角色列表
  const loadRoles = async () => {
    try {
      const { data } = await authApi.getRoles()
      roleOptions.value = data
    } catch (error) {
      ElMessage.error('获取角色列表失败')
    }
  }
  
  // 表单验证规则
  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { 
        validator: (rule, value, callback) => {
          if (!/(?=.*[A-Z])(?=.*\d).{8,}/.test(value)) {
            callback(new Error('至少8位，包含大写字母和数字'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { 
        pattern: /^1[3-9]\d{9}$/,
        message: '手机号格式不正确',
        trigger: 'blur'
      }
    ],
    roles: [
      { required: true, message: '请选择至少一个角色', trigger: 'change' }
    ]
  }
  
  // 提交注册
  const loading = ref(false)
  const submitForm = async () => {
    try {
      loading.value = true
      await authApi.register({
        ...form.value,
        // roles: form.value.roles
      })
      ElMessage.success('注册成功')
      router.push('/login')
    } catch (error) {
      ElMessage.error(error.response?.data?.detail || '注册失败')
    } finally {
      loading.value = false
    }
  }
  
  // 初始化加载角色
  onMounted(() => {
    loadRoles()
  })
  
  // 跳转登录
  const goToLogin = () => {
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f0f2f5;
  }
  
  .register-form {
    width: 600px;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  
  .form-title {
    text-align: center;
    margin-bottom: 30px;
    color: #303133;
  }
  
  .submit-btn {
    width: 100%;
    margin-top: 20px;
  }

  .login-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .login-btn {
    background-color: transparent;
    color: #333;
    border: none;
    cursor: pointer;
    display: flex;
  }

  .login-btn:hover {
    background-color: rgb(235.9, 245.3, 255);
    color: #409eff;
  }
  </style>