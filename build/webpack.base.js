const getProjectRootPath = require('./util').getProjectRootPath;
const config = require('../config/config')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//css压缩的插件 https://github.com/NMFR/optimize-css-assets-webpack-plugin
//While webpack 5 is likely to come with a CSS minimizer built-in, with webpack 4 you need to bring your own.
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//导出css的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//自动生成HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//获取cssLoder
const getCssLoader = require('./util').getCssLoader;

module.exports = env => {

    let baseConfig = {
        entry: {
            index: getProjectRootPath(config.entryPath)
        },
        output: {
            publicPath: config[env].publicPath, //js引用路径或者CDN地址,注意output.publicPath参数，代表：js文件内部引用其他文件的路径
            path: getProjectRootPath(config[env].path),//打包文件的输出路径
            filename: env == "development" ? "[name].js" : "[name].[hash:10].js",
            chunkFilename: env == "development" ? "chunk/[name].js" : "chunk/[name].[hash:10].js",
        },
        mode: env,
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
                    sourceMap: true,
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_debugger: true,//压缩的时候舍弃debugger
                            drop_console: false //压缩的时候舍弃console
                        },
                        output: {
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
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                name: function (file) { //配置图片的输出位置
                                    let directorys = file.split("/")
                                    if (process.env.NODE_ENV === 'development') {
                                        return directorys[directorys.length - 2] + '/[name].[ext]';
                                    }
                                    return directorys[directorys.length - 2] + '/[name].[hash:10].[ext]';
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
                                    optimizationLevel: 3
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
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: getProjectRootPath(config.templatePath),
                minify: {
                    // 压缩选项
                    collapseWhitespace: env=="development"?false:true
                }
            }),

        ]
    }


    let cssLoaderArray = getCssLoader(config.cssLoaderConfig);
    baseConfig.module.rules=baseConfig.module.rules.concat(cssLoaderArray);

    if (config.cssLoaderConfig.cssConbine && config.cssLoaderConfig.type == 'link') {
        baseConfig.plugins.unshift(
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: env=="development"?"css/[name].css":"css/[name].css",
                chunkFilename: env=="development"?"css/[name].css":"css/[name].css",
            }))
    }

    return baseConfig;

}