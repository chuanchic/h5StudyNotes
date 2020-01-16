
/**
 * 什么是express框架？
 * 基于 nodejs 平台，快速、开放、极简的 web 开发框架
 * express中文网：http://www.expressjs.com.cn
 * 
 * 安装express
 * npm install express
 * 
 */

// 1.引包
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var querystring = require('querystring')
var mybodyparser = require('./06.mybody-parser')

// 2.创建实例
var app = express()

// 3.注册路由，提供了三种注册路由的方式
// 方式一：app.METHOD(app.get app.post app.delete ...)
// 特点：请求方式必须一致，请求路径必须一致
// app.get('/', function(req, res){

  // req.body 获取post请求参数(需要注册 body-parser中间件)

  // req.query 获取get请求参数

  // req.originalUrl 获取原始的url地址(类似于原生的req.url)

  // req.path 获取请求的路径(类似于urlObj.pathname)

  // req.params 获取路由参数
  // 路由参数：在注册路由的时候，可以指定路由路径中的某一部分为参数
  // app.get('/details/:id', function(req, res){
  // })
  // :id 就是参数(占位符)，必传
  // :id? 可传可不传
  // 浏览器输入：http://localhost:9999/details/1
  // req.params 就会返回：{"id": 1}

  // req.protocol 获取请求的协议 http等

  // res.status 设置状态码 可以链式调用
  // res.status(404).end()

  // res.send 向浏览器响应数据
  // 可以接收的参数: 字符串 对象 数组 数字(状态码) buffer对象
  // send 方法内部会调用 end 方法，所以 send 方法只能调用一次
  // res.send('你好')

  // res.sendfile 发送文件
  // res.sendfile(path.join(__dirname, 'package.json'))

  // res.download 下载文件
  // 参数一：要下载文件的路径
  // 参数二：给下载的文件重命名
  // 会弹出文件选择框，选择文件，自动下载
  // res.download(path.join(__dirname, 'package.json'))

  // res.json 发送json数据 同send方法类似
  // res.json({name: '小明', age: 18})

  // res.jsonp 发送jsonp数据(函数调用)
  // 请求的时候需要传递callback参数
  // 浏览器输入：http://localhost:9999/?callback=abc
  // 浏览器会响应：abc({"name": '小明', "age": 18})
  // res.jsonp({name: '小明', age: 18})

  // res.redirect 重定向
  // res.redirect("http://www.baidu.com")
// })
// 方式二：app.all
// 特点：请求方式可以不一致，请求路径必须一致
// app.all('/', function(req, res){
// })
// 方式三：app.use
// 特点：请求方式可以不一致，请求路径可以不一致(只要以注册路由的路径开头即可)
// 如果路由的路径是 / 可以省略不写，表示请求任何路径都生效
// app.use('/', function(req, res){
// })

// 如何托管静态资源？
// 静态资源：图片 CSS JavaScript 文件 等
// 通过 express.static() 可以调用多次
// 托管web目录下的静态资源
// app.use('/', express.static('web'))
// app.use(express.static('web')) // 简写方式
// 浏览器访问：http://localhost:9999/test.css
// 服务器就会去 web目录 下找 test.css 返回给浏览器

// 什么是中间件？
// 服务器接收请求 到 服务器响应请求 之间的一层层操作，就是一个个中间件
// 也就是一个个函数，这个函数(比如app.get)有三个参数，req res next
// 其中 req res 是不会改变的，next 用来调用下一个中间件
// 每一个中间件要么结束整个响应过程，要么调起下一个中间件，不然就会挂起
// 默认有一个 404 的中间件，如果我们没有定义中间件，调用 next() 就会调起 404 的中间件
// 定义多个中间件：
// app.use(function(req, res, next){
//   req.test = {
//     name: "haha",
//     age: 18
//   }
//   next() // 这个中间件的作用：可以提前统一处理一些操作，然后再调起下一个中间件
// })
// app.get('/index', function(req, res, next){
//   next() // 调用 next() 只会调起下一个为 /index 的中间件
// })
// app.get('/login', function(req, res, next){
//   res.send('/login ' + req.test.name)
// })
// app.get('/index', function(req, res, next){
//   res.send('/index ' + req.test.name)
// })

// 通过注册 body-parser 中间件，获取 post 请求的参数
// 先安装 npm install body-parser 然后再引包就可以使用了
// bodyParser.urlencoded() 会返回一个 中间件函数
// app.use(bodyParser.urlencoded())
// app.post('/testPost', function(req, res){
//   console.log(req.body)
//   res.send('结束')
// })

// 自己实现一个 body-parser 中间件
// 注意是 mybodyparser 而不是 mybodyparser(req, res, next)
// 因为 use() 里面传的是 函数对象，而不是 函数调用
// app.use(mybodyparser)
// app.post('/testPost', function(req, res){
//   console.log(req.body)
//   res.send('结束')
// })

// 如何使用模板引擎
// 参考文档：http://aui.github.io/art-template/docs/api.html
// 在文档里点击 Express
// 需要安装：npm install art-template
//         npm install express-art-template
// app.engine(模板文件的后缀名, 对应的模板引擎提供的内容)
// 用来为 模板 设置 对应的模板引擎
app.engine('html', require('express-art-template'))
// 设置模板文件所在的目录，默认为views目录
app.set('views', path.join(__dirname, 'views2'))
// 设置模板文件的后缀，之后模板文件可以省略后缀 index.html 变为 index
app.set('view engine', 'html')
app.get('/', function(req, res){
  var obj = {
    msg: 'hello world'
  }
  res.render('index.html', obj)
})

// 4.通过实例监听端口
app.listen("9999", function(){
  console.log('http://localhost:9999')
})
