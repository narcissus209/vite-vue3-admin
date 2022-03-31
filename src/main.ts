import { createApp } from 'vue'
import App from './App.vue'
// svg 雪碧图
import 'virtual:svg-icons-register'

const app = createApp(App)

// 使用路由
import router from './router'
app.use(router)

// 使用store
import store from './store'
app.use(store)

// 使用element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-CN'
app.use(ElementPlus, { locale })

// 自动导入全局组件
import { UseComponents } from './components/common/index'
UseComponents(app)

// 导入图标
import * as ElIcons from '@element-plus/icons-vue'
const ElIconsData = ElIcons as unknown as Array<() => Promise<typeof import('*.vue')>>
for (const iconName in ElIconsData) {
  app.component(iconName, ElIconsData[iconName])
}
// 导入全局样式
import './styles/global.scss'
app.mount('#app')
