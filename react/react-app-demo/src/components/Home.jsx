import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        这是home组件
        {/*
          嵌套路由
        */}
        <ul>
          <li><NavLink to="/home/roles">角色列表</NavLink></li>
          <li><NavLink to="/home/list">列表管理</NavLink></li>
        </ul>
        <Switch>
          <Route path="/home/roles">{Roles}</Route>
          <Route path="/home/list">{List}</Route>
        </Switch>
      </div>
    )
  }
}

function Roles() {
  return (
    <div>角色列表</div>
  )
}

function List() {
  return (
    <div>列表管理</div>
  )
}