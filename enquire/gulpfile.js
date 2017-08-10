'use strict';

var gulp = require('gulp');
    //includer = require('gulp-htmlincluder');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./style/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./style'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./style/**/*.sass', ['sass']);
});

gulp.task('default', function() {
    gulp.watch('./style/**/*.sass', ['sass']);
    //gulp.watch('./html/**/*.html', function(event) {
    //    gulp.start('html');
    //});
});

//gulp.task('htmlIncluder', function() {
//    gulp.src('./html/**/*.html')
//        .pipe(includer())
//        .pipe(gulp.dest('./html'));
//});
//
//gulp.task('html', ['htmlIncluder']);
