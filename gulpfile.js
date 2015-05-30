var gulp = require('gulp');

// Load the packages
var sass = require('gulp-ruby-sass');
var $ = require('gulp-load-plugins')();

// Let's create our styles task
gulp.task('styles', function () { 

  return sass('app/styles/main.scss') 

  .on('error', function (err) {
    console.error('Error!', err.message);
  })

  .pipe(autoprefixer({ 
   browser: ['last 2 version']
 })) 


  .pipe(gulp.dest('app/styles')); 
});

// Let's create our scripts task
gulp.task('scripts', function () {
  
  return gulp.src('app/scripts/main.js') // JS File Location

  .pipe(uglify()) // Minify JS

  .pipe(gulp.dest('app/dist/scripts/')); // Final Destination
});

// Let's create the connect task
gulp.task('connect', function () {

  // Require gulp plugin 
  var connect = require('connect');
  var app = connect()
  .use(require('connect-livereload')({ port: 35279}))
  .use(connect.static('app'))
  .use(connect.static('.tmp'))
  .use(connect.directory('app'));

  // Create the server 
  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started the connect of web server on http://localhost:9000');
    });
});

// Let's create the serve task 
gulp.task('serve', ['connect', 'styles', 'scripts'], function () {
  require('opn')('http://localhost:9000');
});

// Let's create the watch task 
gulp.task('watch', function() {
var server = $.livereload();
  server.listen();
  gulp.watch([
    'app/*.html',
      'app/scripts/**/*.js',
      'app/styles/**/*.css',
      'app/dist/styles/**/*.css',
      'app/images/**/*'
  ]).on('change', function (file) {
    server.changed(file.path)
  });
});
