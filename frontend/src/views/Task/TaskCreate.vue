<template>
    <div class="task-create">
      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        label-width="120px"
        label-position="top"
      >
        <!-- 任务名称 -->
        <el-form-item label="任务名称" prop="name">
          <el-input 
            v-model="form.name" 
            placeholder="请输入任务名称"
            clearable
          />
        </el-form-item>
  
        <!-- 目标主机模式 -->
        <el-form-item label="目标主机模式" prop="hostPattern">
          <el-input
            v-model="form.hostPattern"
            placeholder="支持通配符，如 web-*"
            clearable
          >
            <template #append>
              <el-button @click="showHostPreview">
                <el-icon><View /></el-icon>
                预览匹配主机
              </el-button>
            </template>
          </el-input>
        </el-form-item>
  
        <!-- 监控指标选择 -->
        <el-form-item label="监控指标" prop="metrics">
          <el-select
            v-model="form.metrics"
            multiple
            filterable
            placeholder="请选择指标"
            style="width: 100%"
          >
            <el-option
              v-for="metric in metricOptions"
              :key="metric.value"
              :label="metric.label"
              :value="metric.value"
            />
          </el-select>
        </el-form-item>
  
        <!-- 调度配置 -->
        <el-form-item label="巡检周期" prop="schedule">
          <el-radio-group v-model="form.scheduleType">
            <el-radio-button label="cron">Cron表达式</el-radio-button>
            <el-radio-button label="interval">固定间隔</el-radio-button>
          </el-radio-group>
  
          <div v-if="form.scheduleType === 'cron'" class="cron-editor">
            <el-input
              v-model="form.schedule"
              placeholder="请输入Cron表达式"
            >
              <template #append>
                <el-button @click="showCronDialog">
                  <el-icon><Clock /></el-icon>
                  生成表达式
                </el-button>
              </template>
            </el-input>
          </div>
  
          <div v-else class="interval-select">
            <el-input-number 
              v-model="form.intervalValue" 
              :min="1" 
              :max="60"
            />
            <el-select v-model="form.intervalUnit">
              <el-option label="分钟" value="m" />
              <el-option label="小时" value="h" />
              <el-option label="天" value="d" />
            </el-select>
          </div>
        </el-form-item>
  
        <!-- 阈值配置 -->
        <el-form-item 
          v-for="(threshold, index) in form.thresholds" 
          :key="index"
          :label="`${threshold.metric} 告警阈值`"
        >
          <el-input
            v-model="threshold.value"
            placeholder="输入百分比或绝对值"
          >
            <template #append>
              <el-button @click="removeThreshold(index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="info" @click="addThreshold">添加阈值</el-button>
        </el-form-item>
      </el-form>
  
      <!-- Cron表达式生成对话框 -->
      <cron-dialog v-model="showCron" @submit="handleCronSubmit" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { ElMessage, type FormInstance } from 'element-plus'
  import { useTaskStore } from '@/stores/taskStore'
  
  const formRef = ref<FormInstance>()
  const taskStore = useTaskStore()
  
  // 表单数据
  const form = reactive({
    name: '',
    hostPattern: '',
    metrics: [],
    scheduleType: 'cron',
    schedule: '0 0 * * *',
    intervalValue: 1,
    intervalUnit: 'h',
    thresholds: [] as Array<{ metric: string; value: string }>
  })
  
  // 验证规则
  const rules = {
    name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
    hostPattern: [
      { required: true, message: '请输入主机匹配模式', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9\-*?]+$/, message: '包含非法字符', trigger: 'blur' }
    ],
    metrics: [{ type: 'array', required: true, message: '请选择指标', trigger: 'change' }]
  }
  
  // 指标选项（示例）
  const metricOptions = [
    { label: 'CPU使用率', value: 'cpu_usage' },
    { label: '内存使用率', value: 'memory_usage' },
    { label: '磁盘使用率', value: 'disk_usage' }
  ]
  
  // 提交表单
  const submitForm = async () => {
    try {
      await formRef.value?.validate()
      
      const taskData = {
        ...form,
        schedule: form.scheduleType === 'cron' 
          ? form.schedule 
          : `${form.intervalValue}${form.intervalUnit}`
      }
      
      await taskStore.createTask(taskData)
      ElMessage.success('任务创建成功')
    } catch (error) {
      ElMessage.error('表单验证失败')
    }
  }
  
  // 其他方法
  const addThreshold = () => {
    if (form.metrics.length === 0) {
      return ElMessage.warning('请先选择监控指标')
    }
    form.thresholds.push({ 
      metric: form.metrics[0], 
      value: '' 
    })
  }
  
  const removeThreshold = (index: number) => {
    form.thresholds.splice(index, 1)
  }
  </script>
  
  <style scoped>
  .interval-select {
    display: flex;
    gap: 10px;
    
    :deep(.el-input-number) {
      width: 120px;
    }
  }
  
  .cron-editor {
    width: 100%;
  }
  </style>