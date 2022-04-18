/*
 * @Author: Cary
 * @Date: 2022-04-18 10:58:43
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\packages\renderer\src\env.d.ts
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'qs' {
  import qs from 'qs'

  export default qs
}
