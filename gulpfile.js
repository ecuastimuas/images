const gulp              = require('gulp');
const path              = require('path');
const autoprefixer      = require('gulp-autoprefixer');
const clean             = require('gulp-clean');
const concat            = require('gulp-concat');
const cssnano           = require('gulp-cssnano');
const less              = require('gulp-less');
const rename            = require('gulp-rename');
const size              = require('gulp-size');
const runSequence       = require('run-sequence');
const uglify            = require('gulp-uglifyjs');
const watch             = require('gulp-watch');


gulp.task('default', function () {
    runSequence('clean', ['less', 'js', 'static']);
});

gulp.task('clean', function () {
    return gulp.src([
            'assets/css',
            'assets/js',
            'assets/img'
        ])
        .pipe(clean({force: true}));
});



gulp.task('watch', ['default'], function () {
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/js/**/*.js', ['js']);
});



gulp.task('js', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/masonry/dist/masonry.pkgd.min.js',
        'bower_components/dropzone/dist/min/dropzone.min.js',
        'src/js/**/*.js'
    ])
    .pipe(uglify('script.min.js'))
    .pipe(size({ 'showFiles': true }))
    .pipe(gulp.dest('assets/js'));

});

gulp.task('less', function () {
    return gulp.src('src/less/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(size({ 'showFiles': true }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('static', function () {
   gulp.src('src/img/**/*')
       .pipe(size())
       .pipe(gulp.dest('assets/img'));

   gulp.src('bower_components/font-awesome/fonts/*')
       .pipe(gulp.dest('src/fonts'))
       .pipe(gulp.dest('assets/fonts'));
});
