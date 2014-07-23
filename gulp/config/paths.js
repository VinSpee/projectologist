/* paths object
   ---------------
   Create a reusable files object that you can pass around.
*/

var paths = {};

paths.source = {
  app         : './client/',
  fonts       : './client/bower_components/leveleleven-builder-component-library/fonts/**/*',
  images      : './client/images/**',
  main_style  : './client/styles/main.sass',
  scripts     : './client/scripts/**/*.{js,jsx}',
  scripts_dir : './client/scripts/',
  main_script : './client/scripts/main.jsx',
  styles      : './client/styles/**/*.{scss,sass}',
  styleguide  : './client/styleguide/*.html',
  index       : './client/index.html',
  data        : './client/scripts/json/**/*.json'
};

paths.dest = {
  app     : './build/',
  scripts : './build/scripts/',
  styles  : 'build/styles/',
  fonts   : './build/fonts/',
  images  : './build/images/',
};

module.exports = paths;
