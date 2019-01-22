//以下所有的相对路径根据项目的根目录
exports.config={
    entryPath:"./index.js",
    cssLoaderConfig:{        //用于配置cssLoader 其他参数参考 https://webpack.js.org/loaders/css-loader/#modules
        type: "link",       //仅有 link  和 style 两个选项
        modules: false,
        localIdentName: '[local]',
        sourceMap:false
    },
    templatePath:"./index.html",  //html模板位置
    compressImg:true,               //是否需要压缩图片,配置文件在下面的对象
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


exports.imgCompressConfig={
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