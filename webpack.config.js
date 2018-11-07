const path = require('path');
require('dotenv').config({ path: 'variables.env' });
const MAP_KEY = process.env.MAP_KEY;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  mode: 'development',
  entry: ['babel-polyfill','./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      //{ test: /\.svg$/, use: 'svg-inline-loader?classPrefix'},
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
      { test: /\.(env)$/, use: 'dotenv'},
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'client/index.html', 
      apiUrl: `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&libraries=places`
    }),
  ]
};

// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin()
//   )
//}

module.exports = config;
