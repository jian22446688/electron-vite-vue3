/*
 * @Author: Cary
 * @Date: 2022-04-18 10:58:43
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\types.d.ts
 */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    readonly VITE_DEV_SERVER_HOST: string
    readonly VITE_DEV_SERVER_PORT: string
  }
}
