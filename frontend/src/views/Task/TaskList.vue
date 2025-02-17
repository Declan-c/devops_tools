<template>
    <div class="task-container">
      <el-button type="primary" @click="router.push('/tasks/create')">
        <el-icon><Plus /></el-icon>
        新建任务
      </el-button>
  
      <el-table :data="tasks" style="width: 100%">
        <el-table-column prop="name" label="任务名称" />
        <el-table-column prop="host_pattern" label="目标主机" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button @click="viewDetails(row.id)">详情</el-button>
            <el-button type="danger" @click="deleteTask(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useTaskStore } from '@/stores/taskStore'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const taskStore = useTaskStore()
  const { tasks } = storeToRefs(taskStore)
  
  onMounted(() => {
    taskStore.fetchTasks()
  })
  
  const viewDetails = (taskId: string) => {
    router.push(`/tasks/${taskId}`)
  }
  
  const deleteTask = async (taskId: string) => {
    // 实现删除逻辑
  }
  </script>