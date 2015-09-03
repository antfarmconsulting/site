var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  swig = require('gulp-swig'),
  webserver = require('gulp-webserver'),
  YAML = require('yamljs');

gulp.task('html', [], function () {
  var clientsData = YAML.load('./src/data/clients.yaml');

  console.log(clientsData);
  return gulp.src('src/html/*.html')
    .pipe(swig({
      data: {
        clients: clientsData
      },
      defaults: {
        cache: false
      }
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('copyflat', [], function () {
  return gulp
    .src([
      'src/img/**/*'
    ])
      .pipe(gulp.dest('build/img'));
});

gulp.task('sass', [], function () {
  return gulp.src('src/scss/**/*')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', function () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'src/js/custom.js'
  ])
    .pipe(concat('antfarm.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function () {
  return gulp.watch('src/**/*', ['build']);
});

gulp.task('build', [
  'html',
  'sass',
  'js',
  'copyflat'
]);

gulp.task('workspace', ['build', 'watch'], function () {
  return gulp
    .src('build')
    .pipe(webserver());
});

