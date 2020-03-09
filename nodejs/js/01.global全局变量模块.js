
// 参考文档：nodejs中文网 - 文档 - global - 全局变量

// 全局变量：在所有模块中都能直接使用，不需要导入。
// 在浏览器中有一个全局变量(顶级变量) window
// 在nodejs中有一个全局变量(全局模块) global，和 window 类似
// 特点：global内的所有变量可以直接使用，比如：console
console.log('haha')// 这是nodejs提供的console，并不是浏览器中的console

// __dirname，__filename
console.log(__dirname)// 当前js文件所在的目录
console.log(__filename)// 当前js文件的路径(包括文件名)



