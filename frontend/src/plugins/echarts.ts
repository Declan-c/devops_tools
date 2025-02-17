import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

export default {
  install(app) {
    app.provide('echarts', { use })
  }
}