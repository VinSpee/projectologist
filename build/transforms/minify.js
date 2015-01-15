var concat = require('gulp-concat');

module.exports = {
  scripts: function(t) {
    var uglify = require('gulp-uglify');
    t.build(t.src(), uglify(),concat('app.min.js'), t.dest());
  },
  images: function(t) {
    var imagemin = require('gulp-imagemin');
    t.build(t.src(),
      imagemin({
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{ removeViewBox: false }, { removeEmptyAttrs: false }]
      }),
    t.dest());
  },
  styles: function(t) {
    var gutil = require('gulp-util')
    var uncss = require('gulp-uncss');
    var csso = require('gulp-csso');
    t.eos(
      t.src()
       .pipe(concat('main.min.css'))
       .pipe(csso())
       .on('error', gutil.log)
       .pipe(t.dest())
    );
  }
};
