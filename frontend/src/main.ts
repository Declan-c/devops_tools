import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 全局样式
import '@/assets/styles/main.scss'

// Element Plus 完整引入（开发阶段）
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// ECharts 全局配置
import { provide } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, GaugeChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GaugeChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
])

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 全局配置
app.provide('echarts', { use }) // 提供ECharts核心功能
app.config.globalProperties.$version = '1.0.0' // 全局版本号

app.mount('#app')