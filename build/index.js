var chron   = require('chronic');
var paths   = require('./paths');

var cssmin  = require('./transforms/cssmin');
var del     = require('./transforms/del');
var scripts = require('./transforms/scripts');
var html    = require('./transforms/html');
var serve   = require('./transforms/serve');
var minify  = require('./transforms/minify');
var styles  = require('./transforms/styles');
var icons   = require('./transforms/icons');

chron('assemble', chron.once('html', 'styles', 'images', 'icons', 'scripts'));
chron('default', chron.once('clean', 'assemble'), serve);
chron('serve', serve);

chron('html', chron
  .path(paths.src.main_html).watch(paths.src.html).watch(paths.src.main_html)
  .dest(paths.dest.html),
html)

chron('styles', chron
  .path(paths.src.main_style)
  .dest(paths.dest.styles)
  .watch(paths.src.styles),
styles);

chron('clean', chron
  .src(paths.dest.html), // same as .path (if used as first option)
del);

chron('scripts', chron
  .path(paths.src.main_script, 'app.js')
  .watch(paths.src.scripts)
  .dest(paths.dest.scripts),
scripts);

chron('images', chron
  .path(paths.src.images)
  .dest(paths.dest.images),
minify.images);

chron('icons', chron
  .path(paths.src.icons)
  .dest(paths.dest.images),
icons);
