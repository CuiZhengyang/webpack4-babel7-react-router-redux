const merge = require("webpack-merge");
const getBaseWebpack=require('./webpack.base');
const getProjectRootPath=require('./util').getProjectRootPath;
const config=require('../config/config').config;

const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports =(env)=> {

    let proWebpack={
        plugins: [
            new CleanWebpackPlugin([config[env].path], {
                root: getProjectRootPath("."),
                verbose: true
            })
        ]
    }
    let baseWebpack=getBaseWebpack(env);
    if(config[env].BundleAnalyzer){
        proWebpack.plugins.push(new BundleAnalyzerPlugin())
    }

    return merge(proWebpack, baseWebpack);
};