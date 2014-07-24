/* paths object
   ---------------
   Create a reusable files object that you can pass around.
*/

var paths = {};

paths.source = {
  app         : './app/',
  images      : './app/images/**',
  main_style  : './app/styles/main.styl',
  scripts     : './app/scripts/**/*.{js,jsx,coffee}',
  scripts_dir : './app/scripts/',
  main_script : './app/scripts/main.jsx',
  styles      : './app/styles/**/*.{styl}',
  styleguide  : './app/styleguide/*.html',
  index       : './app/index.html',
  views       : './app/*.html'
};

paths.dest = {
  app     : './build/',
  scripts : './build/scripts/',
  styles  : 'build/styles/',
  images  : './build/images/',
};

module.exports = paths;
