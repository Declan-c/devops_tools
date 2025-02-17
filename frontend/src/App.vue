<template>
  <div id="app" class="app-container">
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
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.auth-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.global-footer {
  background: #f0f2f5;
  text-align: center;
  padding: 3px;
}

</style>