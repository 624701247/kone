var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: __dirname + "/es6/main.js", //
    output: {
        path: __dirname + "/public", //打包后的文件存放的地方
        filename: "sarea.js", //打包后输出文件的文件名
        library: 'sarea'
    },
    devtool: "source-map",
    module: {
      rules: [{
            test: path.join(__dirname, 'es6'),
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        extensions: [".js"]
    },
    plugins: [
        new UglifyJsPlugin()
    ]
}
