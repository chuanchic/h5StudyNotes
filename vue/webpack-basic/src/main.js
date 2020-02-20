// webpack的使用：
//  1.新建根目录例如 webpack-basic 作为Vue项目的根目录
//  2.在根目录下初始化 npm init -y 
//  3.安装：npm install -D webpack webpack-cli
//  4.webpack两种使用方式：1.命令行(不推荐)，2.配置文件(webpack.config.js)

// webpack的四个核心概念：
// 入口(entry) 打包的入口
// 输出(output) 打包的出口
// 加载器(loader) 处理非JS的静态资源
// 插件(plugins) 各种插件实现各种功能

// webpack的 mode 说明：
// 在使用 webpack 的时候应该指定 mode：
//  1.production 生产模式(默认，打包出来的内容会压缩：没有注释、没有空行等)
//  2.development 开发模式
// 指定方式：通过 --mode development 指定为 开发模式

// webpack的 打包处理 流程：
// 1.运行 webpack 的打包命令 webpack ./src/main.js --mode development 
// 2.webpack 就会找到我们指定的入口文件 main.js，然后分析 main.js 中的代码
// 3.当遇到 import $ from 'jquery' 的时候，就会将 jquery 模块的代码拿过来
// 4.继续往下分析，直到分析完整个 main.js 文件
// 4.最后将用到的 所有模块 的代码和我们写的代码打包生成一个新的 main.js 文件
// 5.因此 dist 里的 main.js 文件会多出来一些代码

// 1.命令行的使用方式(不推荐)：借助 webpack-cli 提供的命令 webpack
// 使用命令：webpack 入口文件 -o 出口文件路径(不指定就是默认路径 dist)
// 例如打包 main.js 文件：webpack ./src/main.js
// 但是由于 webpack-cli 的安装不是全局安装，上面命令会报错，找不到 webpack命令
// 一种解决方式是定位到 webpack命令 再执行：./node_modules/.bin/webpack ./src/main.js
// 指定为开发模式：./node_modules/.bin/webpack ./src/main.js --mode development
// 指定出口路径：./node_modules/.bin/webpack ./src/main.js -o ./dist/a.js
// 另一种解决方式也就是不通过 webpack 的前缀：./node_modules/.bin/，
// 在 package.json 里的 Scripts 里配置一个脚本(bash命令)：
// "build": "webpack ./src/main.js --mode development"
// 然后通过 npm 来运行这个脚本：npm run build 就行了
// 原理是：npm 在执行命令的时候会将 ./node_modules/.bin目录 临时 加到环境变量里，
// 所以 webpack 命令就能找到，最后再自动从环境变量里移除
// 最后打包成功就会在根目录下输出 dist，在 dist 目录下就有打包后的文件

// 2.配置文件的使用方式(推荐)：
// 在项目根目录下新建 webpack.config.js 配置文件
// 然后在这个 配置文件 里设置 配置项
// 在 package.json 里的 Scripts 里配置一个脚本(bash命令)："build": "webpack”
// 然后通过 npm 来运行这个脚本：npm run build，就会执行 webpack 命令
// webpack 就会在项目根目录下读取 webpack.config.js 配置文件
// 最后打包成功就会在根目录下输出 dist，在 dist 目录下就有打包后的文件

// webpack 如何开启服务器？
// 1.安装 npm install -D webpack-dev-server
// 2.在 webpack.config.js 里配置 devServer
// 3.在 package.json 里的 Scripts 里配置一个脚本(bash命令)：dev
// 4.然后运行这个脚本： npm run dev 
// 5.不会生成 dist 目录，而是将生成的内容直接放在内存里
// 6.会自动打开 浏览器，去自动开启的 服务器 上访问这些内容
// 7.也就是 webpack 生成的内容在 http://localhost:8080/ 下( / 服务器根目录)
//   比如生成的 main.js 这样访问：http://localhost:8080/main.js
//   比如需要引入 main.js 这样引入：<script src="/main.js"></script>
// 8.这时候命令行里一直在运行这个服务器，通过 control + c 就可以退出服务器
// 9.再次运行服务器只需要再次 npm run dev

// html-webpack-plugin 插件的作用：
// 1.根据指定的模板页面(例如index.html)在内存中生成一个新的页面
// 2.能够自动引入 css、js 等，不需要手动引入(<script src="/main.js"></script>)
// 3.浏览器打开的就是这个新生成的页面
// 这个插件的使用：
// 1.安装 npm install -D html-webpack-plugin
// 2.在 webpack.config.js 中导入这个模块，并在 plugins 中配置就可以了

// loader加载器：
// webpack 自身只能识别 .js 类型的文件，对于 .css、图片、字体等 识别不了
// 但是可以通过 对应的loader 来处理 对应类型的文件
// 比如 .css 类型的文件，可以通过 style-loader css-loader 来处理
//     .less类型的文件，除了需要上面的两个之外，还需要 less-loader
// 加载器的使用：
// 1.安装 npm install -D style-loader css-loader
// 2.在 webpack.config.js 里的 module 中配置 loader 处理规则

// 引入 jquery
// 相当于 const $ = require('jquery') (nodejs里 模块化规范 CommonJS 提供的语法)
// import 是 ES6 中的语法，nodejs 或 浏览器 无法直接识别，通过 webpack 打包处理后才行
import $ from 'jquery'

// 测试代码，使用jquery实现 隔行变色
$('#list > li:odd').css('background-color', 'red')
$('#list > li:even').css('background-color', 'green')

// 导入 css 文件
// webpack 在解析到这一行的时候，会去 webpack.config.js 里的 module 中查找 loader
// 如果查找到了 loader，就通过对应的 loader 来处理这个 css 文件
// 如果没有找到 loader，就会报错
import './css/index.css'