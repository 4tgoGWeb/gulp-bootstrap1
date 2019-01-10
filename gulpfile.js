var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// File Paths
var DEST_PATH = 'app';
var IMAGES_PATH = 'app/src-images/**/*.{png,jpeg,jpg,svg,gif}';


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Images - compress images - run 'gulp image'
gulp.task('images', function () {
	return gulp.src(IMAGES_PATH)
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest(DEST_PATH + '/img'));
});


gulp.task('default', ['serve']);