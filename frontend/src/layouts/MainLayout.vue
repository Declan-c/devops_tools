<template>
    <div class="auth-layout">
      <!-- 公共头部 -->
      <header class="global-header">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="运维系统">
          <h1>SRE智能运维平台</h1>
        </div>
      </header>
  
      <!-- 登录内容区 -->
      <main class="auth-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
  
      <!-- 公共底部 -->
      <footer class="global-footer">
        <p>© 2025 智能运维平台 All Rights Reserved</p>
      </footer>
    </div>
  </template>
  
  <style scoped>
  .auth-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .global-header {
    background: #001529;
    color: white;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
  }
  
  .auth-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
  }
  
  .global-footer {
    background: #f0f2f5;
    text-align: center;
    padding: 24px;
  }
  </style>