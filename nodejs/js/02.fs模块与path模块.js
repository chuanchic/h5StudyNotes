
// 参考文档：nodejs中文网 - 文档 - fs - 文件系统

// 导入 fs 模块
const fs = require('fs')

// 读取文件(异步操作)
// 方式一：返回的结果是buffer对象
// fs.readFile('./data.txt', function(err, data){
//   // 文件读取完成的回调
//   if(err){
//     console.log('读取文件失败了', err)
//     return
//   }
//   // data：默认情况下读取到的结果是buffer对象，buffer对象是nodejs用于操作二进制数据的
//   // toString()：把buffer对象转成字符串
//   console.log(data.toString)
// })
// 方式二：返回的结果是字符串
// fs.readFile('./data.txt', 'utf8', function(err, data){
//   if(err){
//     console.log('读取文件失败了', err)
//     return
//   }
//   console.log(data)
// })

// 写入文件(异步操作)
// 方式一：如果文件已经存在，会覆盖，如果文件不存在，会自动创建
// fs.writeFile('./data.txt', "\nhello world2", function(err){
//   if(err){
//     console.log('写入文件失败了', err)
//     return
//   }
//   console.log('写入文件成功')
// })
// 方式二：追加文件内容(比较笨的方式)
// fs.readFile('./data.txt', 'utf8', function(err, data){
//   if(err){
//     console.log('读取文件内容失败')
//     return
//   }
//   var newData = data + "\nhello world3"
//   fs.writeFile('./data.txt', newData, function(err){
//     if(err){
//       console.log("追加文件内容失败", err)
//       return
//     }
//     console.log('追加文件内容成功')
//   })
// })
// 方式三：追加文件内容(常用方式)
// fs.appendFile('./data.txt', '\nhello world4', function(err){
//   if(err){
//     console.log('追加文件内容失败', err)
//     return
//   }
//   console.log('追加文件内容成功')
// })

// 读取文件(同步操作)
// var result = fs.readFileSync('./data.txt', 'utf8')
// console.log('同步读取文件结果：' + result)

// 删除文件(异步操作)
// var result2 = fs.unlink('./data.txt', function(err){
//   if(err){
//     console.log('删除文件失败', err)
//     return
//   }
//   console.log('删除文件成功')
// })

// 相对路径问题：
// 相对路径 ./ 代表的是 nodejs命令 执行的目录，而不是对应js文件所在目录
// 也就是在执行 nodejs命令 的时候，只会在 nodejs命令 执行的目录去查找文件
// 如果 nodejs命令 执行的目录变了(可以在任何目录下执行 nodejs命令)，就会报错 no such file or directory
// 解决方式：
// 既然 ./ 代表的是 nodejs命令 执行的目录，那么换成对应js文件所在目录就行了
// 获取方式：全局变量 global 下的 __dirname
// /Users/liuchuanchi/Work/h5/h5StudyNotes/nodejs/js
// fs.readFile(__dirname + '/data.txt', 'utf8', function(err, data){
//   if(err){
//     console.log("读取文件失败", err)
//     reutrn
//   }
//   console.log('读取文件成功： ' + data)
// })

// 路径分隔符问题：
// Windows系统里，路径分隔符是反斜杠 \ ，Linux系统里是正斜杠 / 
// 也就是 \\ (\是转义)也代表路径分隔符，/ 也代表路径分隔符
// 但是 \\ 在Linux系统里识别不了，Linux系统只能用 /
// 解决方式：
// 使用path模块，在 nodejs中文网 - 文档 - path - 路径
// path模块会根据操作系统的不同，自动使用 \\ 或者 / 
// 拼接路径：path.join(param1, param2, param3, ...)
// 其他方法：
// path.basename('aa/bb/cc/index.html')     index.html
// path.dirname('aa/bb/cc/index.html')      aa/bb/cc
// path.extname('aa/bb/cc/index.html')      html
// ...

// 导入 path 模块
const path = require('path')

// 读取文件
var filePath = path.join(__dirname, 'data.txt')
fs.readFile(filePath, 'utf8', function(err, data){
  if(err){
    console.log("读取文件失败", err)
    return
  }
  console.log('读取文件成功：' + data)
})


