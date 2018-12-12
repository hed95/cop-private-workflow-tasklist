const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourcePath = path.join(__dirname, './app');
const buildDirectory = path.join(__dirname, './dist');

const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname), 'node_modules', sourcePath],
  },
  output: {
    path: buildDirectory,
    filename: 'bundle.js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  mode: devMode ? 'development' : 'production',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'REALM': JSON.stringify(process.env.AUTH_REALM),
        'AUTH_URL': JSON.stringify(process.env.AUTH_URL),
        'CLIENT_ID': JSON.stringify(process.env.AUTH_CLIENT_ID),
        'AUTH_ACCESS_ROLE': JSON.stringify(process.env.AUTH_ACCESS_ROLE)
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Tether: 'tether',
      'window.Tether': 'tether'
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
          { loader: 'css-loader', options: { url: false, sourceMap: true } }
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
