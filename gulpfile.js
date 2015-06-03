'use strict' // More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

var gulp = require('gulp'); // Require gulp.
var plugins = require('gulp-load-plugins')(); // Autoloading for plugins.

// Let's create our connect task!
// Task to set up a local server + livereload (without the use of a browser plugin).
gulp.task('connect', function () {
  plugins.connect.server({
    root: 'app/',
    port: 1337, // You can change it. ;)
    livereload: true
  });
});

// Let's create our styles task!
// This task'll convert scss into css, autoprefix and move the final stylesheet in a directory.
gulp.task('styles', function () {
  return gulp.src('app/styles/**/*.scss')
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('app/styles/'))
    .pipe(plugins.connect.reload());
});

// Let's create our scripts task!
// This talk'll uglify JS and move the final JS file in a directory.
gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(plugins.uglify())
    .pipe(gulp.dest('app/dist/scripts/'))
    .pipe(plugins.connect.reload());
});

// Let's create our watch task.!
gulp.task('watch', function () {
  gulp.watch('app/styles/**/*.scss', ['styles']); // Watch for changes for scss files.
  gulp.watch('app/scripts/**/*.js', ['scripts']); // Watch for changes for JS files.
});

// Let's create our default task; write 'gulp' in CLI mode to run it.
/*
 * This task is the default task. It'll start the connect task
 * then the watch task. In a nuthsell, it'll run a local server and
 * watch for changes in several files.
 */
gulp.task('default', ['connect', 'watch']);
