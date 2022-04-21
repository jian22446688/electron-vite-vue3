/*
 * @Author: Cary
 * @Date: 2022-04-18 13:52:15
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\packages\renderer\src\router\index.ts
 */
import { createRouter, createWebHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

// 不能使用路由懒加载
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createMemoryHistory(process.env.BASE_URL),
  routes
})

export default router
