import React from 'react'
// 导入路由相关
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

// 根组件
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact path="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App
