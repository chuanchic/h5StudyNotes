import Vue from "vue";
import Router from "vue-router";
// 导入 .vue 类型的组件，不需要添加后缀
import Login from "@/components/login/Login";
import Home from "@/components/home/Home";
import Users from "@/components/users/Users";

// 使用路由
Vue.use(Router);

// 创建 路由实例
const router = new Router({
  // 配置路由规则
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/home",
      component: Home,
      // 配置子路由(路由嵌套)，匹配的组件会展示在 Home 组件的 router-view 中
      children: [
        {
          path: "users",
          component: Users
        }
      ]
    }
  ]
})

// 注册一个全局 前置守卫
// 所有的路由都会先走 前置守卫，都会先回调这个方法
router.beforeEach((to, from, next) => {
  // 实现登录拦截
  if (to.path === '/login') {
    // 访问的是 login 页面，直接放行
    next()
  } else {
    // 访问的不是 login 页面
    const token = localStorage.getItem('token')
    if (token) {
      // 登录成功，直接放行
      next()
    } else {
      //  登录失败，拦截到 登录 页面
      next('/login')
    }
  }
})

export default router
