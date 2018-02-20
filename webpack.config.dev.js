const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');

const port = 8080;

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval',
    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${port}`,
            'webpack/hot/only-dev-server',
            './app/index'
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: 'public/',
        hot: true,
        open: true,
        port: `${port}`,
        historyApiFallback: true,
        publicPath: commonConfig.output.publicPath,
        stats: { colors: true }
    }
});

