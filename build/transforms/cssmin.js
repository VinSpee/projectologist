var gutil = require('gulp-util')
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');
var csso = require('gulp-csso');

module.exports = function(t) {
  t.eos(
    t.src()
     //.pipe(uncss({
          //html: ['./views/index.ejs']
      //}))
     //.on('error', gutil.log)
     .pipe(concat('main.min.css'))
     .pipe(csso())
     .pipe(t.dest())
  );
};
