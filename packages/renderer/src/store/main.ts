/*
 * @Author: Cary
 * @Date: 2022-04-18 14:31:29
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\packages\renderer\src\store\main.ts
 */
import { defineStore } from 'pinia'

/**
 * 使用方法
 * <template>
  <div>{{mainStore.name}}</div>
  </template>

  <script setup lang="ts">
  import { useMainStore } from "@/store/mian"

  const mainStore = useMainStore()

  </script>
  <template>
  <div>用户名:{{ mainStore.name }}<br />长度:{{ mainStore.nameLength }}</div>
  <hr/>
  <button @click="updateName">修改store中的name</button>
  </template>

  <script setup lang="ts">
  import { useMainStore } from '@/store/mian'

  const mainStore = useMainStore()

  const updateName = ()=>{
    // $patch 修改 store 中的数据
    mainStore.$patch({
      name: '名称被修改了,nameLength也随之改变了'
    })
  }
  </script>
 */
export const useMainStore = defineStore({
  id: 'mainstore',
  state: () => {
    return {
      name: 'Cary'
    }
  },
   // getters
   getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async insertPost(data:string){
      // 可以做异步
      // await doAjaxRequest(data);
      this.name = data;
    }
  }

})
