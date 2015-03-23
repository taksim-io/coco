var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jsmin = require('gulp-uglify');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var preprocess = require('gulp-preprocess');
var pkg = require('./package');

gulp.task('validate', function() {
  return gulp.src([
        '*.js',
        'src/*.js',
        'test/*.js'
      ])
      .pipe(jscs({
          preset: 'airbnb'
      }))
      .pipe(jshint({
          lookup: false,
          curly: true,
          eqeqeq: true,
          eqnull: true,
          expr: true,
          noarg: true,
          undef: true,
          unused: true,
          node: true,
          mocha: true,
          predef: ['define']
      }))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
});

gulp.task('build', function() {
  return gulp.src('src/index.js')
      .pipe(preprocess({
        context: {
          VERSION: 'v' + pkg.version
        }
      }))
      .pipe(gulp.dest('build'));
});

gulp.task('test', ['validate', 'build'], function() {
  return gulp.src('test/*.js')
      .pipe(mocha({
        reporter: 'min'
      }));
});

gulp.task('copy', function() {
  return gulp.src('build/*.js')
      .pipe(gulp.dest('dist/' + pkg.name + '.js'));
});

gulp.task('minify', function() {
  return gulp.src('build/*.js')
      .pipe(jsmin({
        preserveComments: 'some'
      }))
      .pipe(gulp.dest('dist/' + pkg.name + '.min.js'));
});

gulp.task('watch', function() {
  gulp.watch([
    'src/*.js',
    'test/*.js'
  ], ['test']);
});

gulp.task('dist', ['test', 'copy', 'minify']);
gulp.task('default', ['test', 'watch']);
