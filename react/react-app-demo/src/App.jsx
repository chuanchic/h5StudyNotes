import React from 'react';
import './App.css';
import Comment from './components/Comment'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import Home from './components/Home'
import Home2 from './components/Home2'
import Login from './components/Login'
import User from './components/User'

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
  // Link 相当于 vue 中的 router-link，Link 最终会渲染成 a 标签
  return (
    <HashRouter >
      <ul>
        <li><Link to="/home">首页</Link></li>
        <li><Link to="/user">用户</Link></li>
        <li><Link to="/login">登录</Link></li>
      </ul>
      {/* 
        路由匹配组件 有两个 Route Switch
        Route 一个路径对应一个组件 或 一个路径对应多个组件，多个组件会一起显示
        Switch 使用 Switch 把一组 Route 包裹起来，当有多项匹配成功的时候，
               会显示所有匹配的第一个，Switch也可不用，保证一个路径对应一个组件就行
      */}
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/home" component={Home2}></Route>
        <Route path="/user" component={User}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </HashRouter>
  );
}

// 导出根组件
export default App;
