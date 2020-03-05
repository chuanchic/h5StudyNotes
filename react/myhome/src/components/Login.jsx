import React from 'react'
// 引入 semantic-ui 的组件
import { Form } from 'semantic-ui-react'
// 引入 Login.css 样式
import './Login.css'
// 引入 withRouter 实现编程式导航
import { withRouter } from 'react-router-dom'

// 登录组件
class Login extends React.Component {
  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pwd: ''
    }
  }
  // 用于处理受控组件
  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  // 登录功能
  login = async e => {
    // 阻止默认行为
    e.preventDefault()

    let { history } = this.props
    let { uname, pwd } = this.state

    // await 会暂停 async 函数的执行
    // 等待 promise 的结果，再继续 async 函数的执行
    let res = await this.axios.post('users/login', {
      uname,
      pwd
    })
    let { meta, data } = res
    if (meta.status === 200) {
      // 把 token 保存到浏览器本地
      localStorage.setItem('myToken', data.token)
      // 把 userid 保存到浏览器本地
      localStorage.setItem('uid', data.uid)
      // 跳转到home组件
      history.push('/home')
    } else {
      console.log(meta.msg)
    }
  }
  // 组件的渲染方法
  render() {
    return (
      <div className="login_container">
        <div className="login_title">登录</div>
        <div className="login_form">
          {/* 
            Form 表示整个表单组件
            Form.Field 表示表单的一个字段
            autoComplete 自动补全关闭，不要提示效果
            required 必填
            onSubmit 点击 登录 按钮会校验合法性，合法就会触发 onSubmit 事件
                     而不应该点击 登录 按钮直接发送登录请求
          */}
          <Form action="" onSubmit={this.login}>
            <Form.Field>
              <Form.Input
                size="big"
                icon="user"
                iconPosition="left"
                placeholder="请输入用户名..."
                autoComplete="off"
                value={this.state.uname}
                onChange={this.handleChange}
                name="uname"
                required
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                size="big"
                icon="lock"
                iconPosition="left"
                placeholder="请输入密码..."
                autoComplete="off"
                value={this.state.pwd}
                onChange={this.handleChange}
                name="pwd"
                required
              />
            </Form.Field>
            <Form.Field>
              {/* fluid 流式布局 宽度填充父窗体 */}
              <Form.Button fluid positive size="big">
                登录
              </Form.Button>
            </Form.Field>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
