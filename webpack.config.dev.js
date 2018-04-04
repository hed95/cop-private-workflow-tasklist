const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');

const port = process.env.PORT || 8080;


const prestUrl = process.env.PREST_URL;
const workflowUrl = process.env.WORKFLOW_URL;
const formIOUrl = process.env.FORM_URL;
const prestDatabaseName = process.env.TX_DB_NAME;

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
        headers: {
            "Access-Control-Allow-Origin": "https://workflow-tasklist.dev.bfarch-notprod.homeoffice.gov.uk/",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        },
        proxy: {
            "/api/reference-data": {
               target: prestUrl,
               secure: false,
                pathRewrite: {
                    '^/api/reference-data/_QUERIES' : `/_QUERIES/read`,
                    '^/api/reference-data' : `/${prestDatabaseName}/public`
                },
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

