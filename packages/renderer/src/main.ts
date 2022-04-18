/*
 * @Author: Cary
 * @Date: 2022-04-18 10:58:43
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\packages\renderer\src\main.ts
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './samples/node-api'

let app = createApp(App)
app.use(createPinia)
app.use(Router)
app.use(ElementPlus)
app.mount('#app').$nextTick(window.removeLoading)
