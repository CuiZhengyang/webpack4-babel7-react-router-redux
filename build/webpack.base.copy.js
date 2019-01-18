const path = require('path');


//:warning: Since webpack v4 the extract-text-webpack-plugin should not be used for css. Use mini-css-extract-plugin instead.
const ExtractTextPlugin = require("extract-text-webpack-plugin");//导出的插件

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");//导出css的插件

//css压缩的插件 https://github.com/NMFR/optimize-css-assets-webpack-plugin
//While webpack 5 is likely to come with a CSS minimizer built-in, with webpack 4 you need to bring your own.
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//压缩图片
const imageminpngquant =require("imagemin-pngquant")

//自动生成HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin');


//开发模式与webpack-dev-server
const webpack=require('webpack')

module.exports = {
    entry: {
        app: './app.js',
        // pageA: './src/pageA.js',
        // pageB:'./src/pageB.js'
        // page:'./src/page.js'
    },
    output: {
        publicPath: "/", //js引用路径或者CDN地址,注意output.publicPath参数，代表：js文件内部引用其他文件的路径
        path: path.resolve(__dirname, "dist"),//打包文件的输出路径
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
    },
    mode: "production",
    devtool: "source-map", // 开启调试
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        openPage:"./index.html",
        port: 5000, // 本地服务器端口号
        hot: true, // 热重载
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {},
        historyApiFallback: {
            // HTML5 history模式
            // rewrites: [{ from: /.*/, to: "/index.html" }]
        }
    },
    optimization: {
        splitChunks: {  //分隔代码
            chunks: 'all',
            //们将需要打包的代码放在cacheGroups属性中,这块的代码将来根据个个项目自己来决定如何配置
            //参考文档：https://webpack.docschina.org/plugins/split-chunks-plugin/
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                // common: {
                //     name: "common",
                //     chunks: "all",
                //     minSize: 1,
                //     priority: 0
                // },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "js/vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                sourceMap:true,
                uglifyOptions:{
                    compress: {
                        warnings: false,
                        drop_debugger: true,//压缩的时候舍弃debugger
                        drop_console: false //压缩的时候舍弃console
                    },
                    output:{
                        comments: false,  //去除注释
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            //---------------------》样式  start
            {
                test: /\.css$/, // 针对CSS结尾的文件设置LOADER
                // use: [{
                //     loader: "style-loader/url"
                // },
                //     {
                //         loader: "file-loader",   //通过link 标签引入html
                //         options: {
                //             name: 'css/[name].css'
                //         }
                //     }
                // ]
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader"
                ]
            },
            {
                test: /\.scss$/,
                // use: [
                //     {
                //         loader: "style-loader/url" // 将 JS 字符串生成为 style 节点
                //     },
                //     {
                //         loader: "file-loader",   //通过link 标签引入html
                //         options: {
                //             name: 'css/[name].css'
                //         }
                //     },
                //     {
                //         loader: "sass-loader" // 将 Sass 编译成 CSS
                //     }
                // ]
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            import: true,
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]

            },
            //---------------------------------------------
            // {
            //     test: /\.css$/, // 针对CSS结尾的文件设置LOADER
            //     use: [{
            //         loader: "style-loader",
            //         options: {
            //             singleton: true // 处理为单个style标签
            //         }
            //     }, {
            //         loader: "css-loader",        //通过 <style>标签引入html
            //         options:{
            //             localIdentName: '[local]'
            //         }
            //     }]
            // },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         {
            //             loader: "style-loader" // 将 JS 字符串生成为 style 节点
            //         },
            //         {
            //             loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            //         },
            //         {
            //             loader: "sass-loader" // 将 Sass 编译成 CSS
            //         }
            //     ]
            // },
            //---------------------》样式  end
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: function (file) { //配置图片的输出位置
                                let directorys=file.split("/")
                                if (process.env.NODE_ENV === 'development') {
                                    return directorys[directorys.length-2]+'/[name].[ext]';
                                }
                                return directorys[directorys.length-2]+'/[name].[hash:10].[ext]';
                            },
                            limit: 1000, // size <= 20KB
                            publicPath: "../img/", //修改css 文件中的路径
                            outputPath: "./img/"   //配置输出路径
                        }
                    },
                    {
                        //用于压缩图片 https://github.com/imagemin/imagemin-gifsicle
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: true,
                                optimizationLevel:3
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: function (file) { //配置图片的输出位置

                                if (process.env.NODE_ENV === 'development') {
                                    return '[name].[ext]';
                                }
                                return '[name].[hash:10].[ext]';
                            },
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: "fonts/",
                            outputPath: "fonts/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
            minify: {
                // 压缩选项
                collapseWhitespace: false
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}