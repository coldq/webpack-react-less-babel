
var webpack = require('webpack');
module.exports = {
  devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项eval-source-map

  entry:  "./src/index.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },


  resolve: {
        extensions: ['', '.js', '.jsx']
  },


  module: {
        loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        },
        {
          test: /\.css$/,
          loader: 'style!css?sourceMap!postcss'//添加对样式表的处理
        },
        {
          test: /\.scss$/, 
          loader: "style!css!sass?sourceMap!postcss"
        },
        {
            test: /\.less$/, 
          loader: "style!css!less?sourceMap!postcss"
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
          loader: 'file'
        }

      ]
  },
  postcss: [
    require('autoprefixer')
  ],

 plugins: [
    new webpack.HotModuleReplacementPlugin(),//热加载插件
     // new webpack.optimize.UglifyJsPlugin({
     //     mangle: {
     //         warnings:false
     //     }
     // }),
     // new webpack.DefinePlugin({
     //     'process.env': {
     //         'NODE_ENV': '"production"'
     //     }
     // })
  ],
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true,
    port:3000

  } 
  
}