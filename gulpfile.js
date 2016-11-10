const gulp              = require('gulp');
const autoprefixer      = require('gulp-autoprefixer');
const concat            = require('gulp-concat');
const cssnano           = require('gulp-cssnano');
const rename            = require('gulp-rename');
const less              = require('gulp-less');
const path              = require('path');


gulp.task('less', function() {

    return gulp.src('src/less/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('assets/css'));
});
