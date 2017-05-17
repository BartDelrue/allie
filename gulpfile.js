/**
 * Created by Bart on 17/05/2017.
 */

var gulp = require('gulp'),
    htmlhint = require('gulp-htmlhint'),
    jshint = require('gulp-jshint'),
    csslint = require('gulp-csslint'),
    sass = require('gulp-sass');

const PATHS = {
    CSS: {
        SRC : './CSS/*',
        DEST : './'
    },
    JS : {
        SRC : './JS/*.js',
        DEST : './'
    },
    HTML : {
        SRC : './*.html',
        DEST : './'
    }
};

gulp.task('css', function () {

    gulp.src(PATHS.CSS.SRC + "allie.scss")
        .pipe(sass())
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(gulp.dest(PATHS.CSS.DEST));

    gulp.src(PATHS.CSS.SRC + "validate.scss")
        .pipe(sass())
        // .pipe(csslint())
        // .pipe(csslint.formatter())
        .pipe(gulp.dest(PATHS.CSS.DEST));
});


gulp.task('js', function () {

    gulp.src(PATHS.JS.SRC)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(PATHS.JS.DEST));
});

gulp.task('html', function () {

    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(PATHS.JS.DEST));
});