// 注意：这里不要使用 ES6 中的模块化语法 import/export

// 依赖于 path 模块
const path = require('path')

// 热更新 依赖于 webpack 模块
const webpack = require('webpack')

// 导入 html-webpack-plugin 模块
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 导入 Vue 单文件组件 需要的模块
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 导出 配置项 给 webpack 使用
module.exports = {

  // 配置入口文件，推荐使用 绝对路径
  entry: path.join(__dirname, './src/main.js'),

  // 配置出口路径和文件
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js' // 文件名随意
  },

  // 配置模式
  mode: 'development',

  // 配置服务器，用来自动打开浏览器，监测文件变化自动刷新
  devServer: {
    // 自动打开 浏览器
    open: true,
    // 修改 端口号，默认 8080
    port: 8080,
    // 打开 热更新：只将修改的内容加载到页面中，而不是刷新整个页面
    hot: true
  },

  // 配置插件
  plugins: [
    // 热更新 需要用的插件
    new webpack.HotModuleReplacementPlugin(),
    // html-webpack-plugin 插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    // Vue 单文件组件 插件
    new VueLoaderPlugin()
  ],

  // 配置 loader 处理规则
  module: {
    rules: [

      // 通过正则表达式，匹配以 .css 结尾的文件，然后指定所使用的 loader
      // 例如 webpack 在分析 import './css/index.css' 的时候，
      // 就会在这里匹配到 style-loader css-loader 这两个加载器
      // 然后由这两个加载器来处理 .css 类型的文件
      // 注意：use 里的 loader 是有顺序的，从右向左处理，
      //      先通过 css-loader 去读取 index.css 里的内容，并转化为一个模块
      //      再通过 style-loader 创建 style 标签，将读取到的内容给 style 标签，
      //      最后将 style 标签插入到页面的 head 中 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      // 处理 .less 类型的文件，处理过程：
      // 先通过 less-loader 将 .less 类型的文件转化成 .css 类型的
      // 之后的处理过程 同上...
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },

      // 处理 .scss 或 .sass 类型的文件
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },

      // 处理 图片文件(推荐用 url-loader，也可以用 file-loader )
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 默认处理所有图片，添加配置，只处理小图片
              // 单位 字节，不超过 8192B(8KB左右) 的图片才会被处理
              // 超过(包括等于) 8192B 的，url-loader 内部会使用 file-loader 去处理
              limit: 8192
            }
          }
        ]
      },

      // 处理 字体文件(配置方式完全可以参照 图片的配置，不过这儿用一用 file-loader)
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader']
      },

      // 配置 babel
      {
        test: /\.js$/,
        use: 'babel-loader',
        // 排除掉不需要被 babel 处理的 文件路径，默认会对所有的 js文件 进行语法解析
        // 排除 /node_modules/
        exclude: /node_modules/
      },

      // 处理 .vue 类型的文件
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },

    ]
  }

}