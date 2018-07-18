var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglifyjs');

var config = {

    path: {
        sass:   './develop/sass/**/*.sass',
        html:   './public/index.html',
        js:     './develop/js/**/*.js'
    },

    output: {
        cssName:    'main.min.css',
        cssPath:    './public/css',
        jsName:     'common.min.js',
        jsPath:     './public/js'
    },

    autoprefix: {
        versions: ['last 5 versions']
    }
}

gulp.task('sass-task', function () {
    return gulp.src(config.path.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer({
            browsers: config.autoprefix.versions,
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.cssPath))
        .pipe(browserSync.stream());
});

gulp.task('scripts-task', function() {
    return gulp.src(config.path.js)
        .pipe(concat(config.output.jsName))
        .pipe(uglify())
        .pipe(gulp.dest(config.output.jsPath))
        .pipe(browserSync.stream());
});

gulp.task('server-task', function () {

   browserSync.init({

      server: {
          //for the anybody files
          baseDir: "public/",
          directory: true
          // for the current file
          // baseDir: "public/",
          // directory: true
      }
   });

   gulp.watch(config.path.sass, ['sass-task']);
   gulp.watch(config.path.js, ['scripts-task']);
   gulp.watch(config.path.html).on('change', browserSync.reload);
});

gulp.task('default', ['sass-task', 'scripts-task', 'server-task']);