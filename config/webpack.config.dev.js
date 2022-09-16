// const path = require('path');
// const { resolve } = path;

// const { VueLoaderPlugin } = require('vue-loader');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // 用于生成 html 文件

const { merge } = require('webpack-merge') // 用于合并配置

// 合并配置
const baseWebpackConfig = require('./webpack.config.base.js')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true, // 开启热更新
    open: false, // 编译之后自动打开网页
    port: 9000 // 指定端口
  },
  module: {
    rules: [
      // 处理 css 文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // 处理 scss 文件
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
})

module.exports = devWebpackConfig
