
// art-template在nodejs中的使用
// 后端渲染页面会使用
// 下载安装 npm install art-template

// 引包
const template = require('art-template')
const path = require('path')
const fs = require('fs')

// 数据
var obj = {
  msg: "hello world"
}

// 准备模板
// ...

// 渲染模板
// 方式一：以文件作为模板
// template(文件路径, 数据)
var result = template(path.join(__dirname, 'tpl.html'), obj)
// 方式二：以字符串作为模板
var htmlStr = "..." //html页面(基本结构)的字符串，在浏览器渲染的时候会依赖数据
var render = template.compile(htmlStr)
var result2 = render({item : obj}) //{item : obj}就是所依赖的数据

