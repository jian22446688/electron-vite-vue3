/*
 * @Author: Cary
 * @Date: 2022-04-18 14:23:56
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\packages\renderer\src\api\index.ts
 */
import request from '../utils/request'

export function getList(params: any) {
  return request({
    url: '/router/getList',
    method: 'get',
    params,
  })
}
