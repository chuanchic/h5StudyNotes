
// art-template在nodejs中的使用
// 后端渲染页面会使用
// 下载安装 npm install art-template

// 引包
const template = require('art-template')
const path = require('path')
const fs = require('fs')

// 准备模板
// ...

// 准备数据
var obj = {
  msg: "hello world"
}

// 渲染模板
// 方式一：以文件作为模板(常用)
// template(文件路径, 数据)
var result = template(path.join(__dirname, 'tpl.html'), obj)

// 渲染模板
// 方式二：以字符串作为模板(偶尔用)
var htmlStr = "..." //html页面(基本结构)的字符串
var render = template.compile(htmlStr) // 根据 模板字符串 创建 渲染函数
var result2 = render({item : obj}) // 将 数据 渲染到 模板

