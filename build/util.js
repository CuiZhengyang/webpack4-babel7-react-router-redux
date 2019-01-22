const path = require("path");
const config=require("../config/config").config;
const imgCompressConfig=require("../config/config").imgCompressConfig;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");//导出css的插件
/**
 * 根据项目的根目录获取文件路径
 * @param path 相对项目根路径的相对地址
 */
exports.getProjectRootPath = (relativePath) => {
    var rootPath = path.join(__dirname, "../", relativePath);
    return rootPath;
}

/**
 *
 * @param config {
 *     type:"style",   可选参数【style,link 】在html中加入style标签引入css 还是加入link标签
    cssConbine:false,  type=link 可以选择是否合并css 代码到一个文件中
 * }
 */
exports.getCssLoader = (userConfig) => {
    let config = {
        type: "style",
        cssConbine: false,
    };

    Object.assign(config,userConfig);
    let loadersArray = [];
    loadersArray.push(getLoader("css", config))
    loadersArray.push(getLoader("scss", config))
    loadersArray.push(getLoader("sass", config))
    loadersArray.push(getLoader("less", config))
    return loadersArray;
}
//根据不同的类型获取不同的loader
const getLoader = (cssType, config) => {


    let {type, cssConbine} = config;
    let loaderObj = {
        test: new RegExp('\\.' + cssType + '$'), // 针对CSS结尾的文件设置LOADER
    };

    if (type == 'link' && cssConbine) {
        //link标签的形式，并且合并css
        loaderObj.use = [
            MiniCssExtractPlugin.loader,
            'css-loader',
            "postcss-loader"
        ]
    }
    else if (type == 'link' && !cssConbine) {
        //link标签的形式，并且不合并css

        throw ("这块代码等待完善！！")
        loaderObj.use = [
            "style-loader/url",
            {
                loader: "file-loader",   //通过link 标签引入html
                options: {
                    name: 'css/[name].css'
                }
            }
        ]
    }
    else if (type == 'style'){
        // style标签引入
        loaderObj.use = [
            {
                loader: "style-loader",
                options: {
                    singleton: true // 处理为单个style标签
                }
            },
            {
                loader: "css-loader",        //通过 <style>标签引入html
                options: {
                    localIdentName: '[local]'
                }
            },
            "postcss-loader"
        ]
    }
    if (cssType != 'css') {
        if (cssType == 'scss') {
            loaderObj.use.push({
                loader: "sass-loader"
            })
        }
        else {
            loaderObj.use.push({
                loader: cssType + "-loader"
            })
        }
    }

    return loaderObj;
}

exports.getImgLoader=()=>{
    let userArray=[
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
        }];
    if (config.compressImg){
        userArray.push(imgCompressConfig)
    }
    return userArray
}