//以下所有的相对路径根据项目的根目录
let config={
    entryPath:"./index.js",
    cssLoaderConfig:{
        type: "link",       //仅有 link  和 style 两个选项
        cssConbine: true,
    },
    templatePath:"./index.html",  //html模板位置
    development:{
        publicPath:"/",
        path:"./dist/",                    //告诉服务器从那么目录开始提供内容
        openPage:"./index.html",
        host: '0.0.0.0',
        port:"5000",
        proxy:{},
        historyApiFallback:{
            // HTML5 history模式
            // rewrites: [{ from: /.*/, to: "/index.html" }]
        }
    },
    production:{
        publicPath:"./",    //生产上项目中静态资源的url 公共地址
        path:"./dist/",      //打包文件存放目录
        BundleAnalyzer:true         //是否分析
    }
}

module.exports=config;