// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// 导入全局样式
import '@/assets/index.css'
// 导入 axios
import axios from 'axios'
// 导入 ElementUI - js
import ElementUI from "element-ui";
// 导入 ElementUI - css
import "element-ui/lib/theme-chalk/index.css";

// 配置 axios 的基础路径，每次使用 axios 发送请求，只需要写当前接口的路径(/users)
// axios 会自动将 baseURL + '/users' 得到完整路径，然后才会发送请求
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 可以在拦截器中统一处理 headers
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发送之前做一些事情
  // 如果不是登录接口,就需要添加 Authorization 请求头
  // endsWith 用来判断是不是以参数为结尾,如果是返回值为true
  if (!config.url.endsWith('/login')) {
    config.headers['Authorization'] = localStorage.getItem('token')
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 在获取到响应数据的时候做一些事情
  if (response.data.meta.status === 401) {
    // 因为现在不是在组件中,因此无法直接使用 this.$router(路由实例)
    // 但是可以使用上面导入的 路由模块 中的 router(路由实例)
    router.push('/login')
    localStorage.removeItem('token')
  }
  return response
})

// 安装 ElementUI 插件
Vue.use(ElementUI);
// 在这里一次导入 axios，其他地方直接使用，将 axios 添加到 Vue 的原型上
// 因为所有 组件 都是 Vue 实例，所以所有 组件 都可以访问 Vue 原型上的 $http
// 类似于 axios 的第三方库(与 Vue 没有任何关系)，都可以通过这种方式来统一导入
Vue.prototype.$http = axios

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  // App 组件是局部组件，需要声明才能被 template 所使用
  components: { App },
  // template: "<App/>" 会覆盖掉 el: "#app"
  template: "<App/>"
});
