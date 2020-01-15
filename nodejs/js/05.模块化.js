
// 模块化标准
// AMD：      异步模块定义  Async Module Definition
// CMD：      通用模块定义  Common Module Definition
// CommonJS： node.js模块化标准

// 模块分类
// 1.核心模块(内置模块)  fs path url http querystring
// 2.第三方模块  mime art-template moment
// 3.目录模块  引入一个文件夹
// 4.文件模块  引入一个文件

// 模块引入
// 1.在引入核心模块和第三方模块的时候
//   先去核心模块里查找
//   如果没有，再去node_modules里查找
//   如果还是没有，再去上一级目录中的node_modules里查找，直到根目录为止
//   最终没有找到就报错
// 2.在引入目录模块和文件模块的时候
//   例如 require('./05.module_a.js')，要以 ./ ../ 开头表示路径，不然会去核心模块和第三方模块里查找
//   优先找这个路径对应的文件，查找顺序为 .js .json .node(js代码编译成二进制的文件，运行效率更快)
//   如果没有找到，再去找这个路径对应的文件夹，如果没有找到就报错
//   如果找到这个文件夹，就去找这个文件夹里的package.json文件
//   如果没有package.json文件，直接引用 index.js / index.json / index.node
//   如果有package.json文件，就去找 main属性
//   如果 main属性 不存在，直接引用 index.js / index.json / index.node
//   如果 mian属性 存在，就去引用 main属性 指定的那个文件
//   最终没有找到就报错

// 定义模块
// 一个js文件就是一个模块，例如 05.module.a.js

// 引用模块
// 通过 require() 函数
// 其中 .js 后缀可以省略
// 其中 require() 函数的返回值，如果不配置导出项，默认返回 空对象
var moduleExportsA = require('./05.module_a.js')
console.log(moduleExportsA)
