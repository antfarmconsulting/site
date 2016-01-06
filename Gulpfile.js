var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  swig = require('gulp-swig'),
  webserver = require('gulp-webserver'),
  YAML = require('yamljs');

gulp.task('html', [], function () {
  var clientsData = YAML.load('./src/data/clients.yaml');

  // console.log(clientsData);
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
      'src/img/**/*',
      'bower_components/prettyphoto/images/**/prettyPhoto/**/*'
    ])
      .pipe(gulp.dest('build/img'));
});

gulp.task('sass', [], function () {
  return gulp.src('src/scss/**/*')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'));
});

gulp.task('unconcatenable-js', function () {
  return gulp.src([
    'src/js/modernizr-custom.js'
  ])
    .pipe(gulp.dest('build/js'));
})

gulp.task('js', function () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jQuery.Marquee/jquery.marquee.min.js',
    'bower_components/prettyphoto/js/jquery.prettyPhoto.js',
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
  'unconcatenable-js',
  'js',
  'copyflat'
]);

gulp.task('workspace', ['build', 'watch'], function () {
  return gulp
    .src('build')
    .pipe(webserver());
});

