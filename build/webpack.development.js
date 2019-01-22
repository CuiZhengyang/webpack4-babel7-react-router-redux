const merge = require("webpack-merge");
const getBaseWebpack=require('./webpack.base');
const getProjectRootPath=require('./util').getProjectRootPath;
const config=require('../config/config').config;



//开发模式与webpack-dev-server
const webpack=require('webpack')

module.exports =(env)=> {

    let devWebpack={
        devtool: "source-map", // 开启调试
        devServer: {
            contentBase: getProjectRootPath(config[env].path),
            openPage:config[env].openPage,
            port: config[env].port, // 本地服务器端口号
            hot: true, // 热重载
            hotOnly:true,
            overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
            proxy: config[env].proxy,
            historyApiFallback: config[env].historyApiFallback,
            useLocalIp: true,
            host: config[env].host,
            watchContentBase: true,
            watchOptions: {
                poll: true
            },
            compress: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ]
    }
    let baseWebpack=getBaseWebpack(env);

    return merge(devWebpack, baseWebpack);

};