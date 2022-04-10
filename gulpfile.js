var gulp = require('gulp');
var pump = require('pump');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jsmin = require('gulp-jsmin');
var cssmin = require('gulp-cssmin');
var webserver = require('gulp-webserver');
var imagemin = require('gulp-imagemin');

// *********************************************** Set Server *********************************************** //
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      directoryListing: true,
      open: true,
      port: 1234
    }));
});

// *********************************************** Watch *********************************************** //
gulp.task('sass', function () {
  return gulp.src('sources/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/assets/css'));
});
gulp.task('sass:watch', function () {
  gulp.watch('sources/sass/**/*.scss', ['sass']);
});

// *********************************************** Production JS *********************************************** //
gulp.task('minjs', function(){
  gulp.src('dist/production/js/**/*.js')
    .pipe(jsmin())
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/production/js'));
});
gulp.task('uglifyjs', function (cb) {
  pump([
        gulp.src('dist/assets/js/**/*.js'),
        uglify(),
        gulp.dest('dist/production/js')
    ],
    cb
  );
});

// *********************************************** Image Optimization *********************************************** //
gulp.task('imagesmin', function(){
	gulp.src(['dist/assets/images/**/*.png','dist/assets/images/**/*.jpg','dist/assets/images/**/*.gif','dist/assets/images/**/*.jpeg'])
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/production/images'))
});

gulp.task('mincss', function () {
  gulp.src('dist/assets/css/**/*.css')
      .pipe(cssmin())
      .pipe(gulp.dest('./dist/production/css'));
});

gulp.task('production', ['uglifyjs', 'minjs', 'mincss', 'imagesmin']);

gulp.task('default', ['sass:watch', 'webserver']);
