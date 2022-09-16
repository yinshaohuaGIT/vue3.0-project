const { merge } = require('webpack-merge') // 用于合并配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取 css 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 删除旧的打包文件

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 打包分析插件
const CompressionPlugin = require('compression-webpack-plugin') // 压缩打包文件插件

// 合并配置
const baseWebpackConfig = require('./webpack.config.base.js')

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      // 处理 css 文件
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      // 处理 scss 文件
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // 打包时删除旧文件
    new CleanWebpackPlugin(),
    // 抽取 css 文件
    new MiniCssExtractPlugin({
      filename: `css/[name]_[contenthash:8].css` // 指定 css 文件的名称
    }),
    // 打包分析插件
    new BundleAnalyzerPlugin(),
    // 压缩文件
    new CompressionPlugin({
      test: /.(js|css)(\?.*)?$/, // 只压缩 js 和 css 文件
      algorithm: 'gzip', // 压缩算法，默认为 gzip
      threshold: 10240, // 文件大于 10 KB 时才压缩，默认为 0
      minRatio: 0.8, // 只有当文件压缩后的比率小于这个值时，文件才会被压缩，默认值 0.8
      deleteOriginalAssets: false // 是否删除原文件，默认为 false
    })
  ],
  optimization: {
    // chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      hidePathInfo: false,
      cacheGroups: {
        vue_lib: {
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex)/,
          name: 'vue_lib'
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
        // default: false, // 禁用默认缓存组
        // defaultVendors: false, // 禁用默认缓存组
      }
    }
  }
})

// console.log('prodWebpackConfig --- ', prodWebpackConfig);

module.exports = prodWebpackConfig
