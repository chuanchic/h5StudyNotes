import React from 'react'

export default class News extends React.Component {
  render() {
    // 通过 props 获取 路由参数
    let { match } = this.props

    return (
      <div>这是news组件，参数id：{match.params.id}</div>
    )
  }
}