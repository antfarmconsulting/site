var gulp = require('gulp'),
  sass = require('gulp-sass'),
  swig = require('gulp-swig'),
  webserver = require('gulp-webserver');

gulp.task('html', [], function () {
  return gulp.src('src/html/*.html')
    .pipe(swig({
      defaults: {
        cache: false
      }
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('sass', [], function () {
  return gulp.src('src/scss/**/*')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function () {
  return gulp.watch('src/**/*', ['build']);
});

gulp.task('dev', ['build', 'watch'], function () {
  return gulp
    .src('build')
    .pipe(webserver());
});

gulp.task('build', ['html', 'sass']);
