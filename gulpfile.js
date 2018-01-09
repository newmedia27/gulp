var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var gcmq = require('gulp-group-css-media-queries');


// var config = {
//
// };


gulp.task('sass', function () {
    gulp.src('./app/sass/**/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));

});
gulp.task('build', function () {
   gulp.src('./app/css/**/*.css')
       .pipe(gcmq())
       .pipe(cleanCSS())
       .pipe(gulp.dest('./build/css'))
});



gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('default',['browserSync','sass'], function () {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});