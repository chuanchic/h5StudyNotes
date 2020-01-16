
var querystring = require('querystring')

// 自己实现一个 body-parser 中间件
// 原理：就是给 req 添加一个 body 属性，存放 post 请求携带的参数
module.exports = function(req, res, next){
  var bufferList = []
  req.on('data', function(chunk){
    bufferList.push(chunk)
  })
  req.on('end', function(){
    var result = Buffer.concat(bufferList).toString()
    // 浏览器发送过来的post请求的数据，有两种形式
    // application/json：     {key:value,key:value}  通过 JSON.parse 来处理
    // x-www-form-urlencoded：key=value&key=value... 通过 querystring 来处理
    var contentType = req.get('content-type')
    if(contentType.indexOf('json') != -1){
      req.body = JSON.parse(result)
    }else if(contentType.indexOf('urlencoded') != -1){
      req.body = querystring.parse(result)
    }else{
      req.body = {}
    }
    next()
  })
}