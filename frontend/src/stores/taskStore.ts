import { defineStore } from 'pinia'
import { inspectionApi } from '@/api/inspection'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    currentResults: {} as Record<string, MetricResult>
  }),
  
  actions: {
    async fetchTasks() {
      const { data } = await inspectionApi.getTasks()
      this.tasks = data
    },
    
    async createTask(task: Omit<Task, 'id'>) {
      await inspectionApi.createTask(task)
      await this.fetchTasks()
    }
  }
})