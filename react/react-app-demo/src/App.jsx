import React from 'react';
import './App.css';
import Comment from './components/Comment'
import { HashRouter, BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Home2 from './components/Home2'
import Login from './components/Login'
import User from './components/User'
import News from './components/News'

// App.js 也可以修改后缀为 App.jsx，jsx 的作用和 js 完全一样
// 有些 编辑器 看到 jsx 文件会提供 高亮、提示 等

function App() {
  // 评论案例
  // return (
  //   <Comment />
  // );

  // 路由容器 有两个 HashRouter BrowserRouter 二者用谁都行
  // HashRouter 通过锚点来实现，路径带 #
  // BrowserRouter 通过H5的 history 模式实现，路径不带 #
  return (
    <BrowserRouter >
      {/* 
        路由连接 有两个 Link NavLink
        Link 相当于 vue 中的 router-link，Link 最终会渲染成 a 标签
        NavLink 作用等同 Link，只是自身多了 active 类，作为选中时的样式
        同时可以通过 activeClassName 修改 active 类名

        导航分为两种 1.声明式导航 2.编程式导航
          Link NavLink 都属于 声明式导航
          编程式导航 是通过 js 代码实现路由跳转 router.push()
        编程式导航 步骤：
          例如在 Login 组件中
          1.导入 withRouter 方法
          2.用 withRouter 方法包裹组件
          3.包裹之后就能通过组件的 props 属性获取到 history 对象
            通过 history 对象就能实现 路由跳转

        嵌套路由 详见 Home 组件
        
      */}
      <ul>
        <li><NavLink activeClassName="select" to="/home">首页</NavLink></li>
        <li><NavLink activeClassName="select" to="/user">用户</NavLink></li>
        <li><NavLink activeClassName="select" to="/login">登录</NavLink></li>
        <li><NavLink activeClassName="select" to="/news">新闻</NavLink></li>
      </ul>
      {/* 
        路由匹配 有两个 Route Switch (路由出口，匹配的组件在哪显示)
        Route 一个路径对应一个组件 或 一个路径对应多个组件，多个组件会一起显示
        Switch 使用 Switch 把一组 Route 包裹起来，当有多项匹配成功的时候，
               会显示所有匹配的第一个，Switch也可不用，保证一个路径对应一个组件就行
        exact 表示精确匹配，配合 path="/" 一起使用，匹配默认页
        exact 配合 Redirect 一起使用，表示路由重定向

        路由参数 /news/:id 匹配 /news/xxx (动态路由)
                /news/:type/:id 匹配 /news/xxx/xxx
        在 News 组件里通过 props 就可以获取到 路由参数
      */}
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <Route exact path="/" component={Home}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/home" component={Home2}></Route>
        <Route path="/user" component={User}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/news/:id" component={News}></Route>
      </Switch>
    </BrowserRouter>
  );
}

// 导出根组件
export default App;
