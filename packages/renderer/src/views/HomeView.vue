<!--
 * @Author: Cary
 * @Date: 2022-04-18 13:52:29
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\packages\renderer\src\views\HomeView.vue
-->
<template>
  <div>home

    <div class="mytest">
      asdfasdfasdf
      <div class="title">提示</div>
      <div>pos: {{x}} : {{y}}</div>
    </div>

    <div>
      <el-button type="" @click="handleFullscreen">全屏</el-button>
      <el-button type="" @click="handleExitFullscreen">关闭</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLocalStorage, useMouse, usePreferredDark, useFullscreen } from '@vueuse/core'

  console.log(useFullscreen())

  const { isFullscreen, enter, exit, toggle } = useFullscreen()

  const {x, y} = useMouse()

  const handleFullscreen = () => {
    enter()
  }
  const handleExitFullscreen = () => {
    exit()
  }

</script>

<style lang="scss" scoped>
.mytest {
  color: #ff0000;
  .title {
    font-size: 24px;
    font-weight: 700;
  }
}

</style>
