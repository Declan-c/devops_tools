import { ElButton, ElTable, ElForm, ElNotification } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(app) {
    // 注册组件
    app.component(ElButton.name, ElButton)
    app.component(ElTable.name, ElTable)
    app.component(ElForm.name, ElForm)
    
    // 注册图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    
    // 挂载通知方法
    app.config.globalProperties.$notify = ElNotification
  }
}