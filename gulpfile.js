'use strict';

var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    stylish = require('gulp-jscs-stylish');

gulp.task('default', () => {
    gulp.src([ './modules/**/**/*.js' ])
        .pipe(jscs())
        .pipe(stylish());
});
