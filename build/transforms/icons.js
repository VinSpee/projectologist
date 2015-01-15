var svgIcons    = require('gulp-svgstore');
var reload      = require('browser-sync').reload;
var cheerio     = require('gulp-cheerio');

module.exports = function (t) {
  var dest = t.dest();
  if (t.params.watch) {
    dest.pipe(reload({stream: true}));
  }
  t.build(t.src(),
    cheerio({
      run: function($) {
        $('[fill]').removeAttr('fill');
      }
    }),
    svgIcons({ fileName: 'icons.svg' }),
  dest);
};

