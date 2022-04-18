/*
 * @Author: Cary
 * @Date: 2022-04-18 14:13:49
 * @FilePath: \alien-docse:\cary\node-project\electron-vite-vue3\packages\renderer\src\utils\request.ts
 */
import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

const baseURL = 'http://localhost:3000'
const requestTimeout = 15000
const contentType = 'application/x-www-form-urlencoded;charset=UTF-8'

const CODE_MESSAGE = {
  0: '未可知错误，可能是因为后端不支持跨域CORS、接口地址不存在等问题引起',
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}

/**
 * axios响应拦截器
 * @param data response数据
 * @param status HTTP status
 * @param statusText HTTP status text
 * @returns {Promise<*|*>}
 */
const handleData = async (responen: AxiosResponse<any, any>) => {
  const { data, status = 0, statusText, request } = responen
  // 若data.code存在，覆盖默认code
  let code = data && data['code'] ? data['code'] : status
  // 若code属于操作正常code，则code修正为200
  switch (code) {
    case 200:
      // 业务层级错误处理，以下是假定restful有一套统一输出格式(指不管成功与否都有相应的数据格式)情况下进行处理
      // 例如响应内容：
      // 错误内容：{ code: 1, msg: '非法参数' }
      // 正确内容：{ code: 200, data: {  }, msg: '操作正常' }
      // return data
      // 判断是文件流的形式 吧 respone 都返回
      // if (request.responseType) return responen
      return data
    case 401:
      
      break
    case 403:
      break
  }
  // 异常处理
  // 若data.msg存在，覆盖默认提醒消息
  
  return Promise.reject(data)
}

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    // const token =
    //   'TbmyWxs3W6/DSFuKxpprB4Dj1pcyrIDB5z7rsRzMdas+GvXpnvXWpFddkTqfCmVLRzIpCFrNE8garq3iIW+CSC0hsiGAErtFKN5ogkXbkL8='

    // 不规范写法 可根据setting.config.js tokenName配置随意自定义headers
    // if (token) config.headers[tokenName] = token

    // 规范写法 不可随意自定义
    // if (token) config.headers['Authorization'] = `Bearer ${token}`

    if (config.data && config.headers && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
      config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response = {} } = error
    return handleData(response)
  }
)

// 下载文件的前置方法
let downloadInstance = axios.create({
  responseType: 'blob',
})

downloadInstance.interceptors.request.use((req) => {
  // todo 下面文件需要添加 token 可以使用
  // req.headers['token'] = ''
  return req
})

downloadInstance.interceptors.response.use(response => {
  if (response.status === 200) return response
  return response
})

export const axiosDownload = (url: any) => {
  return downloadInstance({ url })
}

export default instance
