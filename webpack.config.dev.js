const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');

const port = process.env.PORT || 8080;

const prestUrl = `${process.env[process.env.PREST_NAME + "_SERVICE_HOST"]}:${process.env[process.env.PREST_NAME + "_SERVICE_PORT"]}`;
const workflowUrl = `${process.env[process.env.WORKFLOW_NAME + "_SERVICE_HOST"]}:${process.env[process.env.WORKFLOW_NAME + "_SERVICE_PORT"]}`;
const formIOUrl = `${process.env[process.env.FORM_IO_NAME + "_SERVICE_HOST"]}:${process.env[process.env.FORM_IO_NAME + "_SERVICE_PORT"]}`;

console.log("prestUrl " + prestUrl);
console.log("workflowUrl " + workflowUrl);
console.log("formIOUrl " + formIOUrl);


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
        stats: {colors: true},
        proxy: {
            "/api/reference-data": {
               target: prestUrl,
               pathRewrite: {"^/api/reference-data" : "/public"},
               secure: false,
               changeOrigin: true
            },
            "/api/form": {
                target: formIOUrl,
                secure: false,
                pathRewrite: {"^/api/form": "/form"},
                changeOrigin: true
            },
            "/api/workflow": workflowUrl
        }
    }
});

