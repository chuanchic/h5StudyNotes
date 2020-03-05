import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
// 导入 axios 模块
import axios from 'axios'

// 把 axios 对象绑定到 react 组件的原型上，所有的 react 组件都能访问到
React.Component.prototype.axios = axios

// 给 axios 对象配置 默认 全局路径
axios.defaults.baseURL = 'http://localhost:9999/'
// axios.defaults.baseURL = 'http://47.96.21.88:8086/'

// 给 axios 配置 响应拦截器
axios.interceptors.response.use(
  // 成功回调
  function (response) {
    // 拦截到 axios 所有请求，直接返回响应结果中的 data 数据
    return response.data
  },
  // 失败回调
  function (error) {
    return error
  }
)

// 给 axios 配置 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 每次请求，除了 login，都要添加 token 值
    if (!window.location.href.endsWith('/login')) {
      config.headers.Authorization = localStorage.getItem('myToken')
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 渲染根组件
ReactDOM.render(<App />, document.getElementById('root'))
