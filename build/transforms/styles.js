var gutil            = require('gulp-util');
var postcss          = require('gulp-postcss');
var reload           = require('browser-sync').reload;
var sourcemaps       = require('gulp-sourcemaps');
var autoprefixer     = require('autoprefixer-core');
var calc             = require('postcss-calc');
var colorFunction    = require('postcss-color-function');
var gray             = require('postcss-color-gray');
var colorHexAlpha    = require('postcss-color-hex-alpha');
var customMedia      = require('postcss-custom-media');
var customProperties = require('postcss-custom-properties');
var fontVariant      = require('postcss-font-variant');
var inline           = require('postcss-import');
var nested           = require('postcss-nested');
var mincss           = require('./cssmin');

module.exports = function(t) {
  var dest = t.dest();
  if (t.params.watch) {
    dest.pipe(reload({stream: true}));
  }
  if (t.params.production) {
    dest.pipe(mincss(t));
  }
  t.build(t.src(),
    sourcemaps.init(),
    postcss([
      inline({
        path: ['app/styles/']
      }),
      nested,
      customProperties(),
      calc(),
      customMedia(),
      gray(),
      colorHexAlpha(),
      colorFunction(),
      fontVariant(),
      autoprefixer({ browsers: 'last 2 versions' })
    ]),
    //sourcemaps.write('.'),
  dest);
};
