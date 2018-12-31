const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');
const SriPlugin = require('webpack-subresource-integrity');
const ManifestPlugin = require('webpack-manifest-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const path = require('path');
const buildDirectory = path.join(__dirname, './dist');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = webpackMerge(common, {
  mode: 'production',
  entry: {
    main: './app/index'
  },
  optimization: {
    nodeEnv: 'production'
  },
  plugins: [
    new CleanWebpackPlugin([
      buildDirectory
    ], {
      verbose: true,
      dry: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new UglifyWebpackPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      uglifyOptions: {
        mangle: true,
        output: {
          comments: false,
        }
      },
      exclude: [/\.min\.js$/gi]
    }),
    new ProgressPlugin(true),
    new ManifestPlugin(),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new SriPlugin({
      hashFuncNames: ['sha384'],
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new CopyWebpackPlugin([
      { from: 'public/img', to: 'img' },
      { from: 'server.js', to: '' }
    ]),
    new OfflinePlugin({
      ServiceWorker: {
        events: true
      }
    })
  ],

});
