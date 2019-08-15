
const express = require('express');

const webpack = require('webpack');
const common = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const compression = require('compression')
;

const port = process.env.PORT || 8080;


module.exports = webpackMerge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      './app/index',
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    compress: true,
    contentBase: 'public/',
    hot: true,
    open: true,
    port: `${port}`,
    historyApiFallback: true,
    publicPath: common.output.publicPath,
    stats: { colors: true },
    before(app) {
      app.use(compression({}));
      app.post('/log', (req, res, next) => {
        const body = [];
        req.on('data', (chunk) => {
          console.log(chunk);
          body.push(chunk);
        });
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split('=')[1];
          console.log(parsedBody);
          console.log(message);
        });
        console.log(body);
        res.sendStatus(200);
      });
    },
  },
});

