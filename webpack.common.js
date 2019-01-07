const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const sourcePath = path.join(__dirname, './app');
const buildDirectory = path.join(__dirname, './dist');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HashedModuleIdsPlugin } = require('webpack');

const hashing = process.env.NODE_ENV === 'production' ? 'chunkhash' : 'hash';
console.log('content hashing: '+ hashing);

module.exports = {
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname), 'node_modules', sourcePath],
  },
  output: {
    path: buildDirectory,
    filename: `[name].[${hashing}].js`,
    chunkFilename: `[name].[${hashing}].chunk.js`,
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  plugins: [
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new MiniCssExtractPlugin({
      filename: `[name].[${hashing}].css`,
      chunkFilename: `[name].[${hashing}].chunk.css`
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true
      },
      canPrint: false
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['es-gb'],
    }),
    new HtmlWebpackPlugin({
      title: 'Caching',
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Tether: 'tether',
      'window.Tether': 'tether',
      React: 'react',
      ReactDOM: 'react-dom'
    }),
  ],
  module: {

    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/,
        include: path.join(__dirname, 'app'),
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true, minimize: true } },
          { loader: 'postcss-loader', options: {} },
        ]
      }, {
        test: /\.bpmn$/,
        use: [{
          loader: 'file-loader',

          options: {
            name: 'diagrams/[name].[ext]'
          }
        }]
      }, {
        test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',

          options: {
            name: 'img/[name].[ext]'
          }
        }],
      }, {
        test: /\.(eot|com|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',

          options: {
            mimetype: 'application/octet-stream',
            name: 'fonts/[name].[ext]'
          }
        }],
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',

          options: {
            mimetype: 'image/svg+xml',
            name: 'img/[name].[ext]'
          }
        }],
      }, {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]

      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['node_modules/**/*.scss']
          }
        }]
      }]

  }
};
