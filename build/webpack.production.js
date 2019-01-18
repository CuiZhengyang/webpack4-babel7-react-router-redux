const merge = require("webpack-merge");
const getBaseWebpack=require('./webpack.base');
const getProjectRootPath=require('./util').getProjectRootPath;
const config=require('../config/config');

const CleanWebpackPlugin = require("clean-webpack-plugin");


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

    return merge(proWebpack, baseWebpack);

};