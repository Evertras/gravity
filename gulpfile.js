var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');

function handleErrors(err) {
  console.log(err);
}

gulp.task('default', () => {
  var bundler = watchify(browserify('./app/app.js'));

  bundler.on('update', rebundle);
  bundler.on('log', gutil.log.bind(gutil));

  function rebundle() {
    return bundler.bundle()
                  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
                  .pipe(source('app.js'))
                  .pipe(gulp.dest('./wwwroot/js/'));
  }

  return rebundle();
});
