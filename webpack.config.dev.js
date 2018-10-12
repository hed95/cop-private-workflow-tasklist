const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');

const port = process.env.PORT || 8080;


const platformDataUrl = process.env.PLATFORM_DATA_URL;
const workflowUrl = process.env.WORKFLOW_URL;
const formIOUrl = process.env.FORM_URL;
const translationServiceUrl = process.env.TRANSLATION_SERVICE_URL;
const reportUrl = process.env.REPORT_SERVICE_URL;

console.log("platformDataUrl " + platformDataUrl);
console.log("workflowUrl " + workflowUrl);
console.log("formIOUrl " + formIOUrl);
console.log("translationServiceUrl " + translationServiceUrl);


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
            "/api/platform-data": {
                target: platformDataUrl,
                pathRewrite: {
                    '^/api/platform-data' : ''
                },
                secure: false,
                changeOrigin: true
            },
            "/api/reports": {
                target: reportUrl,
                secure: false,
                changeOrigin: true
            },
            "/reportspublic": {
                target: reportUrl,
                secure: false,
                changeOrigin: true
            },
            "/api/form": {
                target: formIOUrl,
                secure: false,
                changeOrigin: true
            },
            "/ws/workflow": {
                target: workflowUrl,
                secure: false,
                ws: true
            },
            "/api/workflow": {
                target: workflowUrl,
                changeOrigin: true,
                secure: true,
                onProxyReq: function onProxyReq(proxyReq, req, res) {
                    console.log('Workflow Proxy -->  ', req.method, req.path, '-->', `${workflowUrl}${proxyReq.path}`);
                },
            },
            "/rest/camunda": {
                target: workflowUrl,
                changeOrigin: true,
                onProxyReq: function onProxyReq(proxyReq, req, res) {
                    console.log('bretWorkflow Proxy -->  ', req.method, req.path, '-->', `${workflowUrl}${proxyReq.path}`);
                },
            },
            "/api/translation": {
                target: translationServiceUrl,
                changeOrigin: true
            },

        }
    }
});

