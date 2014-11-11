var gulp             = require('gulp');
var gutil            = require('gulp-util');
var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig    = require('../../webpack.config.js');
var paths = require('../config/paths.js');

gulp.task('webpack-dev-server', function(cb) {
  new WebpackDevServer(webpack(webpackConfig), {
    contentBase: paths.dest.app,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    debug: true
  }).listen(1337, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:1337/webpack-dev-server/');
  });
  cb();
});
