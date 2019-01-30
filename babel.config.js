// 这意味着如果两次转译都访问相同的”程序”节点，则转译将按照 plugin 或 preset 的规则进行排序然后执行。
//
// Plugin 会运行在 Preset 之前。
// Plugin 会从第一个开始顺序执行。ordering is first to last.
//Preset 的顺序则刚好相反(从最后一个逆序执行)。

const presets = [
    "@babel/preset-react",
    ["@babel/preset-env", {
        "modules": false,
        "targets": {
            "node": "current",
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        },
        useBuiltIns: "usage" //其中有一个 "useBuiltIns" 选项，当设置为 "usage" 时,只包括你需要的 polyfill
    }]
];
const plugins = [
    "@babel/plugin-syntax-dynamic-import", //用于支持webpack import(/* webpackChunkName: '名称'*/'路径') 方式的动态导入(dynamic imports)
    ["@babel/plugin-transform-runtime", {
        "helpers": false,  //将调用的模块直接写到包里面。
        "regenerator": true,// 切换生成器函数转换为使用不会污染全局范围的再生器运行时。
        // "useESModules": false   //默认是false 不使用es6 的代码
    }]
]
// const plugins=[];
module.exports = {presets, plugins};