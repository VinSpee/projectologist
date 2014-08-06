/* paths object
   ---------------
   Create a reusable files object that you can pass around.
*/

var paths = {};

paths.source = {
  app         : './app/',
  images      : './app/images/**',
  main_style  : './app/styles/main.css',
  scripts     : './app/scripts/**/*.js',
  scripts_dir : './app/scripts/',
  main_script : './app/scripts/app.js',
  styles      : './app/styles/**/*.css',
  styleguide  : './app/styleguide/*.html',
  templates   : './*.hbs',
  index       : './app/index.html',
  views       : './app/*.html'
};

paths.dest = {
  app     : './assets/',
  scripts : './assets/scripts/',
  styles  : './assets/styles/',
  images  : './assets/images/',
};

module.exports = paths;
