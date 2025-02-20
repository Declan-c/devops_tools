<template>
    <div class="home-view">
      <el-card class="regulation-card">
        <template #header>
          <div class="card-header">
            <el-icon><InfoFilled /></el-icon>
            <span class="title">系统操作红线</span>
          </div>
        </template>
        
        <div class="content">
          <el-alert type="error" :closable="false">
            <ul class="red-line-list">
              <li>严禁在未授权情况下修改生产环境配置</li>
              <li>禁止绕过审批流程直接部署代码</li>
              <li>不得使用个人账号进行高危操作</li>
            </ul>
          </el-alert>
        </div>
      </el-card>
  
      <el-card class="standard-card">
        <template #header>
          <div class="card-header">
            <el-icon><InfoFilled /></el-icon>
            <span class="title">标准操作规范</span>
          </div>
        </template>
  
        <div class="content">
          <div class="regulation-section">
            <h4>变更管理</h4>
            <ul>
              <li>所有变更必须通过工单系统审批</li>
              <li>生产变更需提前24小时提交变更窗口申请</li>
              <li>变更实施必须遵循"三板斧"原则：可灰度、可观测、可回滚</li>
            </ul>
          </div>
  
          <div class="regulation-section">
            <h4>日常巡检</h4>
            <ul>
              <li>每日9:00前完成系统健康检查</li>
              <li>巡检发现问题需30分钟内创建故障工单</li>
              <li>每周生成系统健康度评估报告</li>
            </ul>
          </div>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { InfoFilled } from '@element-plus/icons-vue'
  </script>
  
  <style scoped lang="scss">
  .home-view {
    // padding: 2px;
    max-width: 1200px;
    margin: 0 auto;
  
    .regulation-card, .standard-card {
      margin-bottom: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      
      .card-header {
        display: flex;
        align-items: center;
        .el-icon {
          margin-right: 8px;
          font-size: 16px;
        }
        .title {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  
    .red-line-list {
      padding-left: 24px;
      margin: 0;
      li {
        font-size: 15px;
        line-height: 2;
        color: #f56c6c;
        font-weight: 600;
        padding-left: 5px;
      }
    }
  
    .regulation-section {
      margin-bottom: 25px;
      
      h4 {
        color: #409eff;
        border-left: 4px solid #409eff;
        padding-left: 15px;
        // margin: 15px 0;
      }
  
      ul {
        padding-left: 30px;
        margin: 8px 0;
        
        li {
          line-height: 1.4;
          margin-bottom: 8px;
          color: #606266;
          padding-left: 8px;
          font-size: 15px;
        }
      }
    }
  
    @media (max-width: 768px) {
      padding: 5px;
      
      .regulation-card, .standard-card {
        margin-bottom: 13px;
      }
      
      .red-line-list li {
        font-size: 14px;
      }
    }
  }
  </style>