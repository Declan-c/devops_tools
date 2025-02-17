import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000
})

export interface Task {
  id: string
  name: string
  host_pattern: string
  metrics: string[]
  schedule: string
}

export const inspectionApi = {
  // 获取任务列表
  getTasks: () => api.get<Task[]>('/tasks'),
  
  // 创建新任务
  createTask: (task: Omit<Task, 'id'>) => api.post('/tasks', task),
  
  // 获取任务结果
  getTaskResults: (taskId: string) => 
    api.get<Record<string, MetricResult>>(`/tasks/${taskId}/results`)
}

export interface MetricResult {
  current: number
  max: number
  avg: number
}