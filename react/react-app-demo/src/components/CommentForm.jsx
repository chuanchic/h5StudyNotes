import React from 'react'

// 评论添加 子组件
class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      content: ''
    }
  }
  render() {
    return (
      <div className="form">
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <br />
        <textarea
          value={this.state.content}
          onChange={this.handleChange}
          name="content"
          cols="30"
          rows="5"
        />
        <br />
        <button onClick={this.addFn}>添加</button>
      </div>
    )
  }
  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  // 添加评论
  addFn = () => {
    // 调用父组件传递过来的方法
    let { add } = this.props
    add(this.state.name, this.state.content)
    // 清空表单
    this.setState({
      name: '',
      content: ''
    })
  }
}

export default CommentForm