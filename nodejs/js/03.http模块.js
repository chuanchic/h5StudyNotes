
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const querystring = require('querystring')
const url = require('url')

// 创建服务器基本步骤(nodejs没有服务器，需要创建)
// 分四步：
// 1.导入http模块
// 2.创建服务器
// 3.服务器处理请求
// 4.启动服务器，监听某个端口

// 1.导入http模块
const http = require('http')

// 2.创建服务器
var server = http.createServer();

// 3.服务器处理请求(只要用户给服务器发送了请求，这个request事件就会触发)
server.on('request', function(req, res){
  //如果用户请求的是 http://localhost:9999，那么req.url就是 / ，需要处理
  if(req.url == '/'){
    req.url = '/index.html'
  }
  // req.headers 可以获取到 请求报文 中的 请求头信息 是一个对象
  // req.rawHeaders 同上 请求头信息 是一个数组
  // req.httpVersion 浏览器发送的http请求的协议的版本号
  // req.method 请求方式

  // 如何获取get请求携带的参数？
  // req.url   ...?name=haha&age=18
  // 方式一：手动获取
  // if(req.url.indexOf('?') > 0){
  //   var params = {}
  //   var queryStr = req.url.split('?')[1]
  //   queryStr.split('&').forEach(function(v, i){
  //     var temp = v.split('=')
  //     params[temp[0]] = temp[1]
  //   })
  //   console.log(params)
  // }
  // 方式二：通过 querystring 模块，自带的，不是第三方的，不需要安装
  // if(req.url.indexOf('?') > 0){
  //   var str = req.url.split('?')[1]
  //   var params = querystring.parse(str)
  //   console.log(params)
  // }
  // 方式三：通过 url 模块，也是自带的，不需要安装
  // urlObj常用的两个属性
  // pathname  路径部分的内容
  // query  参数部分的内容，默认是字符串
  // 如果url.parse(urlStr, parseQueryString)第二个参数传true，就会解析query，变成对象
  // var urlObj = url.parse(req.url, true)
  // console.log(urlObj)

  // 如何获取post请求携带的参数？
  // 给req注册 data 事件，当post请求有数据发送到服务器的时候，就会触发
  // 如果数据比较多，会多次触发，依次发送，chunk 是一个buffer对象
  // 定义数组，用于接收每次发送过来的数据
  var bufferArr = []
  req.on('data', function(chunk){
    bufferArr.push(chunk)
  })
  // 给req注册 end 事件，数据发送完毕，就会触发
  req.on('end', function(){
    // 将数组里的多个buffer对象合并成一个
    var result = Buffer.concat(bufferArr)
    // 如果result是请求的参数，那么直接toString()就能拿到
    // name=haha&age=18
    var params = querystring.parse(result.toString())
    console.log(params)
  })

  // 中文会有乱码，因为VS Code的编码是utf-8，浏览器默认的是GBK
  // 解决乱码方式：设置响应头，告诉浏览器用utf-8解析内容
  // content-type：MIME类型，不同的文件有不同的MIME类型，例如html文件和css文件的MIME类型是不同的
  // 如果给每个文件都做MIME类型的区分，太繁琐，如何统一处理呢？
  // 借助第三方模块 mime (第三方模块已经实现好了，可以直接使用)
  // 安装 mime 模块：npm install mime
  // 使用参考：npm官网 - 搜索框输入 mime 然后搜索
  // npm官网：https://www.npmjs.com
  // 根据文件的路径或者文件的后缀名，获取对应的content-type
  // text.json：application/json
  // test.js：application/javascript
  // test.html：text/html
  // test.css：text/css
  var contentType = mime.getType(req.url)
  // 根据 ‘text/html’ 反推文件的后缀，返回 html
  // var extension = mime.getExtension('text/html')
  res.setHeader('content-type', contentType + ';charset=utf-8')
  // res.setHeader: 可以用来设置响应头 一次只能设置一个
  // res.writeHead: 也可以用来设置响应头，一次可以设置多条，还能设置状态码
  // response.writeHead(404, "OK", {
  //   "content-type": "text/html;charset=utf-8",
  //   "name": "fangwei",
  //   "age": 17
  // })

  // 拦截请求url
  // 这种方式不推荐，因为case情况太多了，如何统一处理呢？
  // switch (req.url) {
  //   case "/index.html"://index页面
  //       readFile('index.html', res)
  //       break;
  //   case "/anoceanofsky.css"://index页面对应的样式
  //       readFile('anoceanofsky.css', res)
  //       break;
  //   default:
  //       fileNotFount(res)
  //       break;
  // }
  // 推荐方式
  readFile(req.url, res)

})

// 读取数据，响应给浏览器
// res.write 用来向浏览器响应数据，可以接收字符串或者buffer对象，可以调用多次
// res.end 用来结束响应，可以接收字符串或者buffer对象，最后一次返回数据
function readFile(fileName, res){
  fs.readFile(path.join(__dirname, 'testresources', fileName), function (err, data) {
    if (err) {
      fileNotFount(res)
    } else {
      res.end(data);
    }
  });
}

// 文件没有找到
function fileNotFount(res){
  res.statusCode = 404;
  res.statusMessage = "Not Found";
  res.end("文件未找到");
}

// 4.启动服务器，监听某个端口
// 端口范围 1-65535 之间，推荐 7000 以上
server.listen(9999, function(){
  console.log('服务器启动成功了，请访问：http://localhost:9999')
})
// 通过 nodejs 命令执行当前js文件就能启动服务器，之前需要先关闭已经启动过的服务器，避免端口占用
// 关闭服务器:
// 方式一：如果是启动新的Terminal窗口(Terminal窗口可以启动多个)，终止旧的那个Terminal窗口来释放端口
// 先切换到旧的那个Terminal窗口下，然后在Terminal窗口右边有个垃圾桶图标，点击就行
// 方式二：直接在当前Terminal窗口下，按 fn + control + c 退出就行



