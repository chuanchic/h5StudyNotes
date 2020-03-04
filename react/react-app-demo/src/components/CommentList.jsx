import React from 'react'

// 评论列表 子组件
class CommentList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    // 子组件通过 props 获取父组件传递过来的数据
    let { list } = this.props
    return (
      <div className="list">
        <ul>
          {list.map(item => (
            <li key={item.id}>
              <h3>
                评论人：
                {item.name}
              </h3>
              <p>
                评论内容：
                {item.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CommentList