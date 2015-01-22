module.exports = {
  src: {
    images: './app/images/*.{png,jpg,gif,svg,webp}',
    icons: './app/images/icons/**/*.svg',
    styles: './app/styles/**/*.css',
    main_style: './app/styles/main.css',
    scripts: './app/scripts/**/*.{js,jsx}',
    styleguide: './app/styleguide/index.md',
    main_script: './app/scripts/app.js',
    html: './app/html/*/**/*.html',
    main_html: './app/html/*.html'
  },
  dest: {
    images: './dist/images',
    styles: './dist/styles',
    scripts: './dist/scripts',
    html: './dist'
  }
}
