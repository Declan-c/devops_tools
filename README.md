# SRE自动化运维工具
- 项目简介

- 项目结构规划
```bash
├── frontend/               # 前端项目
│   ├── public/            # 静态资源
│   ├── src/
│   │   ├── api/           # 接口定义
│   │   ├── stores/        # Pinia状态管理
│   │   ├── views/         # 页面组件
│   │   │   ├── Task/
│   │   │   ├── Dashboard/
│   │   ├── utils/         # 工具函数
│   │   └── main.ts
│
├── backend/               # 后端项目
│   ├── app/
│   │   ├── core/         # 核心逻辑
│   │   │   ├── prometheus_client.py
│   │   │   └── alert_manager.py
│   │   ├── db/           # 数据库层
│   │   ├── models/       # Pydantic模型
│   │   ├── routes/       # 路由控制器
│   │   ├── tasks/        # Celery任务
│   │   └── config.py     # 配置管理
│   ├── requirements.txt
│   └── main.py
│
├── docker-compose.yml     # 容器编排
└── .env                   # 环境变量
```

- 数据流
```mermaid
sequenceDiagram
    participant F as 前端
    participant B as FastAPI
    participant C as Celery
    participant P as Prometheus
    participant R as Redis

    F->>B: 提交巡检任务配置
    B->>PostgreSQL: 存储任务元数据
    B->>C: 创建定时任务
    C->>B: 定时触发执行
    B->>P: 发送PromQL查询请求
    P-->>B: 返回指标数据
    B->>R: 缓存处理结果（3天TTL）
    B->>F: 返回执行状态
    F->>B: 请求任务结果
    B->>R: 获取缓存数据
    R-->>B: 返回缓存结果
    B-->>F: 展示数据图表
```