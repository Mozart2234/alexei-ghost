/*
* Dependencias
*/

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    nib = require('nib');

var livereload = false;

// Compila Styl a CSS
gulp.task('stylus', function () {
  gulp.src('./assets/stylus/style.styl')
    .pipe(stylus({
      compress: true,
      use: nib()
    }))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(gulpif(livereload, connect.reload()))
});

// Reload cuando cambia un archivo html

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

// Reload cuando cambia un archivo js
gulp.task('js', function () {
  gulp.src('./assets/js-dev/*.js')
    .pipe(connect.reload());
});

// Levantar servidor con livereload
gulp.task('connect', function () {
  connect.server({
    root: '.',
    hostname: '0.0.0.0',
    port: 9000,
    livereload: true
  });
  livereload = true;
})

//Minify JS
gulp.task('minify-js', function(){
  return gulp.src('./assets/js-dev/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'))
})

// Minifica CSS externos
gulp.task('minify-css', function() {
  return gulp.src('./assets/css-dev/vendor/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./assets/css/vendor/'))
})

// Minify JS externos
gulp.task('minify-js-vendor', function() {
  return gulp.src('./assets/js-dev/vendor/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/vendor/'))
})

// Concat CSS
gulp.task('css-concat', function(){
  return gulp.src('./assets/css/vendor/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./assets/css/vendor/'))
})

// Vendor-css
gulp.task('js-concat',function(){
  return gulp.src('./assets/js/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./assets/js/vendor/'))
})

// Gulp Watch
gulp.task('watch', function() {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch('./assets/stylus/*.styl', ['stylus']);
  gulp.watch('./assets/js-dev/*.js', ['js']);
})

gulp.task('watch-stylus', function(){
  gulp.watch('./assets/stylus/*.styl', ['stylus']);
})

// Default gulp

gulp.task('default', ['connect', 'watch']);
