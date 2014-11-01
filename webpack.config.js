var webpack = require('webpack');
var paths = require('./gulp/config/paths');
var path = require('path');
var reworkConfig = require('./gulp/tasks/styles');

module.exports = {
  cache: true,
  entry: [
    'webpack-dev-server/client?http://localhost:1337',
    'webpack/hot/dev-server',
    './app/scripts/app.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/scripts/'
  },
  resolveLoader: {
    modulesDirectories: [
      './app/scripts/',
      'node_modules'
    ]
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['react-hot', 'jsx?insertPragma=React.DOM&harmony']
    }, {
      test: /\.json$/,
      loader: 'json'
    }],
  }
};


