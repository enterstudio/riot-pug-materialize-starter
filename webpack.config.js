var webpack = require('webpack');

// postcss plugins
var cssimport = require('postcss-import');
var customProperties = require('postcss-custom-properties');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');
var cssnested = require('postcss-nested');

module.exports = {
  entry: {
    app : ['./src/index.js']
  },
  output: {
    path: __dirname + '/build/',
    filename: 'bundle.js'
  },
  devtool: 'eval',
  debug: true,
  plugins: [
  new webpack.ProvidePlugin({
    riot: 'riot',
    "window.jQuery": "jquery"
  })
  ],
  module: {
    preLoaders: [
    { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'babel' } }
    ],
    loaders: [
    { test: /\.js|\.tag$/, exclude: /node_modules/, include: /src/, loader: 'babel-loader' },
    { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
    { test: /\.pug$/, exclude: /node_modules/, loader: 'tag-pug-loader' },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=100000' }
    ]
  },
  postcss: [cssimport, cssnested, customProperties, autoprefixer, csswring],
  devServer: {
    contentBase: './build/',
    port: 1337,
    hot: true,
    inline: true
  }
};
