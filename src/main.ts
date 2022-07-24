import { createApp } from 'vue'
import './reset.css'
import App from './App.vue'
import { router } from './router/index'
import { createPinia } from 'pinia'
import '@/assets/iconfont/iconfont.css'

createApp(App).use(router).use(createPinia()).mount('#app')
