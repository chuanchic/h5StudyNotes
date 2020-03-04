import React from 'react'
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  render() {
    return (
      <div>
        这是login组件
        <button onClick={this.login}>点击登录</button>
      </div>
    )
  }
  login = () => {
    let { history } = this.props
    history.push('/home')
  }
}

// withRouter(Login) 会创建一个新的组件，但是还是当前组件
// 会新增一些属性 const {match, location, history} = this.props
export default withRouter(Login)