var gulp = require('gulp'),
  sass = require('gulp-sass'),
  swig = require('gulp-swig');

gulp.task('html', [], function () {
  return gulp.src('src/html/*.html')
    .pipe(swig())
    .pipe(gulp.dest('build'));
});

gulp.task('sass', [], function () {
  return gulp.src('src/scss/**/*')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', ['html', 'sass']);
