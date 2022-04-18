<!--
 * @Author: Cary
 * @Date: 2022-04-18 10:58:43
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\packages\renderer\src\components\HelloWorld.vue
-->
<script setup lang="ts">
import { ref } from 'vue'
import { ipcRenderer, ipcMain } from 'electron'

defineProps<{ msg: string }>()

const count = ref(0)

const handleBtnClick = () => {
  console.log('click')
  ipcRenderer.emit('main-process-message')
  ipcRenderer.send('main-message')
}

</script>

<template>
  <el-button @click="handleBtnClick">测试</el-button>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
