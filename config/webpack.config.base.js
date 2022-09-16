const HtmlWebpackPlugin = require('html-webpack-plugin') // 用于生成 html 文件
const path = require('path')

const { resolve } = path

const { VueLoaderPlugin } = require('vue-loader')

const config = {
  mode: 'development',
  entry: {
    main: resolve(__dirname, '../src/main.ts')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'] // 新增
  },
  output: {
    path: resolve(__dirname, '../dist'), // 打包后的文件输出的目录
    filename: `js/[name]_[chunkhash:8].js` // 设置打包后的 js 文件名，如果在文件名前增加文件路径，会将打包后的 js 文件放在指定的文件夹下
  },
  devServer: {
    hot: true, // 开启热更新
    open: false, // 编译之后自动打开网页
    port: 9000 // 指定端口
  },
  module: {
    rules: [
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [
          /node_modules/,
          // \\ for Windows, / for macOS and Linux
          /node_modules[\\/]core-js/
        ]
      },
      // 处理 .vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      // 处理 css 文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // 处理 scss 文件
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      // 使用 webpack 内置的资源模块，对图片资源的处理
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext]'
        }
      }
      // 参考上面图片的处理方式，可以设置其它资源的处理方式
      // 视频、音频等
      // {
      //   test: /\.(mp3|mp4|mov)$/,
      //   type: 'asset',
      //   generator: {
      //     filename: 'media/[name]_[hash:8][ext][query]'
      //   },
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 4 * 1024 // 4kb，设置阈值，小于这个大小的，会被处理成 base 64 的字符串，默认是8kb
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    // 生成 html 文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'), // 以根目录下的 index.html 文件为模板，生成项目的入口文件
      filename: 'index.html', // 生成的入口文件名
      chunks: ['main'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    })
  ]
}
module.exports = config
