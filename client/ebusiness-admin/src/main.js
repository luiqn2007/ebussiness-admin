import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import './styles/mystyle.css'

const app = createApp(App)

import * as ElementPlusIconVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
    .use(router)
    .mount('#app')