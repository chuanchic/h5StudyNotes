import Vue from "vue";
import Router from "vue-router";
// 导入 .vue 类型的组件，不需要添加后缀
import Login from "@/components/login/Login";

// 使用路由
Vue.use(Router);

export default new Router({
  // 配置路由规则
  routes: [
    {
      path: "/login",
      component: Login
    }
  ]
});
