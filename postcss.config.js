//合成雪碧图
/*********** sprites config ***************/
let spritesConfig = {
    spritePath: "./dist/img/icon"
};
/******************************************/


module.exports = {
    plugins: {
        'postcss-import': {},  //plugin to transform @import rules by inlining content.
        'postcss-cssnext': {}, //PostCSS plugin to use tomorrow’s CSS syntax, today.
        //配置doc https://github.com/2createStudio/postcss-sprites/tree/fe7c2071ff44252eb9335d49e43ce0ff61a8ca3c
        // 'postcss-sprites':{
        //     spritePath:'./sprites',
        //     filterBy: function(image) {
        //         // image 样例
        //         //
        //         // { path:
        //         //     '/Users/cuizhengyang/WebstormProjects/WebpackStudy/src/assets/icon/1.jpg',
        //         //         url: '../assets/icon/1.jpg',
        //         //     originalUrl: '../assets/icon/1.jpg',
        //         //     retina: false,
        //         //     ratio: 1,
        //         //     groups: [],
        //         //     token: '',
        //         //     styleFilePath:
        //         //     '/Users/cuizhengyang/WebstormProjects/WebpackStudy/src/css/base.css' }
        //         //
        //         let derectory=image.path.split("/");
        //
        //         if (derectory[derectory.length-2]!='icon') {
        //             return Promise.reject();
        //         }
        //         return Promise.resolve();
        //     }
        // }
    }
}