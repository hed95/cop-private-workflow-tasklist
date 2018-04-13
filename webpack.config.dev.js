const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');

const port = process.env.PORT || 8080;


const prestUrl = process.env.PREST_URL;
const workflowUrl = process.env.WORKFLOW_URL;
const formIOUrl = process.env.FORM_URL;
const prestDatabaseName = process.env.TX_DB_NAME;

const translationServiceUrl = process.env.TRANSLATION_SERVICE_URL;

console.log("prestUrl " + prestUrl);
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
            "/api/reference-data": {
                target: prestUrl,
                secure: false,
                changeOrigin: true
            },
            "/api/form": {
                target: formIOUrl,
                secure: false,
                changeOrigin: true
            },
            "/api/workflow": {
                target: workflowUrl,
                changeOrigin: true
            },
            "/api/translation": {
                target: translationServiceUrl,
                changeOrigin: true
            },

        }
    }
});

