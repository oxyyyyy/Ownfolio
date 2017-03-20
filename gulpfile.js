var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    gutil = require('gulp-util'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    concatCss = require('gulp-concat-css'),
    del = require('del'),
    imageop = require('gulp-image-optimization');


gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.sass')
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  return gulp.src([
    'app/libs/circle-progress.min.js',
    'app/libs/classie.js',
    'app/libs/clipboard.min.js',
    'app/libs/imagesloaded.pkgd.min.js',
    'app/libs/main.js',
    'app/libs/main2.js',
    'app/libs/masonry.pkgd.min.js',
    'app/libs/wow.min.js',
    'app/libs/jquery.waypoints.min.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify().on('error', gutil.log))
  .pipe(gulp.dest('app/js'));
});

gulp.task('concatCssTask', function() {
  return gulp.src(['app/css/**/*.css','!app/css/bundle.css','!app/css/bundle.min.css'])
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('minCss', ['sass', 'concatCssTask'], function() {
  return gulp.src('app/css/bundle.css')
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'));
});

gulp.task('clean', function() {
  del('dist/**').then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});


gulp.task('imgOpti', function(cb) {
    gulp.src(['img/**/*.png','img/**/*.jpg','img/**/*.gif','img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('img')).on('end', cb).on('error', cb);
});

// Watch!
gulp.task('watch', ['browser-sync', 'minCss'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Bulid!
gulp.task('build', ['sass', 'scripts', 'imgOpti', 'minCss'], function() {

  var buildCss = gulp.src([
    'app/css/bundle.min.css'
  ])
  .pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src([
    'app/js/libs.min.js',
    'app/js/my_main_scripts.js'
  ])
  .pipe(gulp.dest('dist/js'));

  var buildJsMod = gulp.src([
    'app/libs/modernizr-custom.js'
  ])
  .pipe(gulp.dest('dist/libs'));

  var buildImg = gulp.src('app/img/**/*')
  .pipe(gulp.dest('dist/img'));

  var buildHtmlPhp = gulp.src('app/*')
  .pipe(gulp.dest('dist/'));

});
