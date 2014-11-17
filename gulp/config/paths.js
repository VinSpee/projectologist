/* paths object
   ---------------
   Create a reusable files object that you can pass around.
*/

var paths = {};

paths.source = {
  app         : './app/',
  images      : './app/images/**/*.{jpg,gif,png,svg,webp}',
  sprites     : './app/sprites/**/*.svg',
  fonts       : './app/fonts/**/*.{svg,eot,ttf,woff}',
  main_style  : './app/styles/main.css',
  scripts     : './app/scripts/**/*.{js,jsx}',
  scripts_dir : './app/scripts/',
  main_script : './app/scripts/app.js',
  styles      : './app/styles/**/*.css',
  icons_dir   : './app/styles/icon/lib/',
  views       : './app/*.html'
};

paths.dest = {
  app     : './build/',
  scripts : './build/scripts/',
  styles  : './build/styles/',
  images  : './build/images/',
  fonts   : './build/fonts/',
};

module.exports = paths;
