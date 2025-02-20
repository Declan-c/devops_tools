<template>
  <div class="dash-board">
    <!-- 头部导航 -->
    <header class="main-header">
      <div class="header-left">
        <!-- <el-icon class="logo-icon" name="el-icon-s-opportunity" /> -->
        <h1 class="system-title">SRE智能运维平台</h1>
      </div>
      <div class="header-right">
        <el-tag type="success">测试环境</el-tag>
        <el-dropdown>
          <span class="user-info">
            <el-avatar :size="30" src="/user-avatar.png" />
            <span class="username">{{ username }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <el-menu
          :default-active="activeMenu"
          router
          background-color="#001529"
          text-color="#fff"
          active-text-color="#1890ff"
        >
                    
          <el-sub-menu index="/tasks">
            <template #title>
              <!-- <el-icon><Setting /></el-icon> -->
              <span class="menu-text">巡检任务管理</span>
            </template>
            <el-menu-item index="/dashboard/tasks/list">任务列表</el-menu-item>
            <el-menu-item index="/dashboard/tasks/create">新建任务</el-menu-item>
          </el-sub-menu>

          <el-menu-item class="menu-item" index="/dashboard/tasks/report">
            <!-- <el-icon><DataAnalysis /></el-icon> -->
            <span class="menu-text">巡检报告</span>
          </el-menu-item>
          
          <el-menu-item class="menu-item" index="/dashboard/opreter">
            <!-- <el-icon><Bell /></el-icon> -->
            <span class="menu-text">操作中心</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 内容视图 -->
      <main class="content-view">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const logout = () => authStore.logout()

// 计算属性
const activeMenu = computed(() => route.path)
const username = computed(() => user.value?.username || '管理员')

</script>

<style lang="scss" scoped>
.dash-board {
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

    .logo-icon {
      font-size: 28px;
      color: #4ac9f7;
    }

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

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      .username {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background: #001529;
  overflow-y: auto;

  :deep(.el-menu) {
    border-right: none;
  }

  .badge {
    margin-left: 8px;
  }
}

  .content-view {
    flex: 1;
    padding: 20px;
    background: #fff;
    overflow-y: auto;
  }

  .menu-item {
    height: 80px;
  }
  .menu-text {
    font-size: 17px;
    font-weight: bold;
  }

  .fade-transform-enter-active,
  .fade-transform-leave-active {
    transition: all 0.3s ease;
  }

  .fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>