import React from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

// 评论 父组件
class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        { id: 1, name: '张三', content: '沙发' },
        { id: 2, name: '李四', content: '板凳' },
        { id: 3, name: '王五', content: '卖瓜子' }
      ],
      index: 3
    }
  }
  render() {
    return (
      <div>
        <h1>评论案例</h1>
        {/* 父组件 传递函数给 子组件 */}
        <CommentForm add={this.add} />
        <hr />
        {/* 父组件 传递评论列表给 子组件 */}
        <CommentList list={this.state.list} />
      </div>
    )
  }
  // 添加评论
  add = (name, content) => {
    this.state.list.push({
      id: ++this.state.index,
      name,
      content
    })
    this.setState(this.state)
  }
}

export default Comment