var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var paths = require('../config/paths');

var webpackConfig = {
  entry: {
    app: paths.source.main_script
  },
  module: {
    loaders: [{
      test: /(\.jsx|\.js)$/,
      loader: 'jsx-loader?insertPragma=React.DOM'
    }, {
      test: /(\.json)$/,
      loader: 'json-loader'
    }],
  },
  output: {
    path: paths.dest.scripts,
    filename: '[name].js'
  },
};

gulp.task('webpack-prod', function(cb) {
  var config = Object.create(webpackConfig);
  config.output.filename = '[name].min.js';

  config.plugins = webpackConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      }
    })
  ];
  webpack(config, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    cb();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack', function(cb) {
  devCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    cb();
  });
});
