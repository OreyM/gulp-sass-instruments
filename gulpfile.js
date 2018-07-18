var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglifyjs');

var config = {

    inputPath: {
        sass:   './develop/sass/**/*.sass',
        html:   './public/index.html',
        js:     './develop/js/**/*.js'
    },

    outputPath: {
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
    return gulp.src(config.inputPath.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.outputPath.cssName))
        .pipe(autoprefixer({
            browsers: config.autoprefix.versions,
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.outputPath.cssPath))
        .pipe(browserSync.stream());
});

gulp.task('scripts-task', function() {
    return gulp.src(config.inputPath.js)
        .pipe(concat(config.outputPath.jsName))
        .pipe(uglify())
        .pipe(gulp.dest(config.outputPath.jsPath))
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

   gulp.watch(config.inputPath.sass, ['sass-task']);
   gulp.watch(config.inputPath.js, ['scripts-task']);
   gulp.watch(config.inputPath.html).on('change', browserSync.reload);
});

gulp.task('default', ['sass-task', 'scripts-task', 'server-task']);