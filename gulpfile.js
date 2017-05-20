var gulp = require('gulp'),
  htmlhint = require('gulp-htmlhint'),
  jshint = require('gulp-jshint'),
  csslint = require('gulp-csslint'),
  sass = require('gulp-sass'),
  sasslint = require('gulp-sass-lint'),
  webpack = require('gulp-webpack'),
  cache = require('gulp-cached'),
  a11y = require('gulp-accessibility'),
  rename = require('gulp-rename');

const PATHS = {
  CSS: {
    SRC: './src/allie.scss',
    DEST: './'
  },
  CSS_VALIDATORS: {
    SRC: './validators/validate.scss',
    DEST: './'
  },
  CSS_COMPONENTS: {
    SRC: './src/*/*.scss',
    DEST: './'
  },
  JS_COMPONENTS: {
    SRC: './src/*/*.js',
    DEST: './'
  },
  JS: {
    SRC: './src/allie.js',
    DEST: './'
  },
  HTML: {
    SRC: './*.html',
    DEST: './'
  }
};

gulp.task('watch', function () {

  gulp.watch(PATHS.CSS_COMPONENTS.SRC, ['validate-css', 'bundle-css']);
  gulp.watch(PATHS.CSS_VALIDATORS.SRC, ['bundle-css']);
  gulp.watch(PATHS.CSS.SRC, ['bundle-css']);

  gulp.watch(PATHS.JS_COMPONENTS.SRC, ['validate-js', 'bundle-js']);
  gulp.watch(PATHS.JS.SRC, ['bundle-js']);

  gulp.watch(PATHS.HTML.SRC, ['validate-html']);
});

gulp.task('bundle-css', function () {

  gulp.src(PATHS.CSS.SRC)
    .pipe(sass())
    .pipe(gulp.dest(PATHS.CSS.DEST));


  gulp.src(PATHS.CSS_VALIDATORS.SRC)
    .pipe(sass())
    .pipe(gulp.dest(PATHS.CSS_VALIDATORS.DEST));
});

gulp.task('validate-css', function () {

  gulp.src(PATHS.CSS_COMPONENTS.SRC)
    .pipe(cache('validate-css'))
    .pipe(sasslint({
      rules: {
        'no-qualifying-elements': 0,
        'force-attribute-nesting': 0,
        'force-element-nesting': 0,
        'force-pseudo-nesting': 0
      }
    }))
    .pipe(sasslint.format())

});

gulp.task('bundle-js', function () {

  gulp.src(PATHS.JS.SRC)
    .pipe(webpack({
      output: {
        filename: 'allie.js'
      }
    }))
    .pipe(gulp.dest(PATHS.JS.DEST));
});

gulp.task('validate-js', function () {

  gulp.src(PATHS.JS_COMPONENTS.SRC)
    .pipe(cache('validate-js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('validate-html', function () {

  gulp.src(PATHS.HTML.SRC)
    .pipe(cache('validate-html'))
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter())
    .pipe(a11y({
      force: true,
      reportLevels: {
        notice: false,
        warning: false,
        error: true
      }
    }))
});
