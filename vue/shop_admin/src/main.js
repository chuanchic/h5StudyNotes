// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

// 导入全局样式
import '@/assets/index.css'

// 导入 ElementUI - js
import ElementUI from "element-ui";
// 导入 ElementUI - css
import "element-ui/lib/theme-chalk/index.css";

// 安装 ElementUI 插件
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // App 组件是局部组件，需要声明才能被 template 所使用
  components: { App },
  // template: "<App/>" 会覆盖掉 el: "#app"
  template: "<App/>"
});
