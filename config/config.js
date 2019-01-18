//以下所有的相对路径根据项目的根目录
let config={
    entryPath:"./index.js",
    cssLoaderConfig:{
        type: "link",       //仅有 link  和 style 两个选项
        cssConbine: true,
    },
    templatePath:"./index.html",
    development:{
        publicPath:"/",
        path:"./dist/",
        openPage:"./index.html",
        port:"5000",
        proxy:{},
        historyApiFallback:{
            // HTML5 history模式
            // rewrites: [{ from: /.*/, to: "/index.html" }]
        }
    },
    production:{
        publicPath:"./",
        path:"./dist/"
    }
}

module.exports=config;