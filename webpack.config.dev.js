const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');

const port = process.env.PORT || 8080;

console.log("prest name " + process.env.PREST_NAME);
console.log("workflow name " + process.env.WORKFLOW_NAME);
console.log("formio name " + process.env.FORM_IO_NAME);
console.log("bpmn modeler name " + process.env.WORKFLOW_MODELER);

const prestName = process.env.PREST_NAME.toUpperCase().replace("-", "_");
const workflowName =process.env.WORKFLOW_NAME.toUpperCase().replace("-", "_");
const formIOName = process.env.FORM_IO_NAME.toUpperCase().replace("-", "_");
const bpmnModelerName = process.env.WORKFLOW_MODELER.toUpperCase().replace("-", "_");


const prestUrl = `${process.env[ prestName+ "_SERVICE_HOST"]}:${process.env[prestName + "_SERVICE_PORT"]}`;
const workflowUrl = `${process.env[workflowName + "_SERVICE_HOST"]}:${process.env[workflowName+ "_SERVICE_PORT"]}`;
const formIOUrl = `${process.env[formIOName + "_SERVICE_HOST"]}:${process.env[formIOName + "_SERVICE_PORT"]}`;
const bpmnModelerUrl =  `${process.env[bpmnModelerName + "_SERVICE_HOST"]}:${process.env[bpmnModelerName + "_SERVICE_PORT"]}`;


console.log("prestUrl " + prestUrl);
console.log("workflowUrl " + workflowUrl);
console.log("formIOUrl " + formIOUrl);
console.log("bpmnModeler " + bpmnModelerUrl);


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

