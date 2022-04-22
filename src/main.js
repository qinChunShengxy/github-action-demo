import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App)

app.use(ElementPlus).use(router).use(createPinia()).component('svg-icon', SvgIcon).mount('#app')
