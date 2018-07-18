var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    fileRename  = require('gulp-rename');

var config = {

    developDir: {
        path: 'dev/'
    },

    inputPath: {
        sass:   './dev/sass/**/*.sass',
        html:   './dev/**/*.html',
        js:     './dev/js-src/**/*.js'
    },

    outputPath: {
        cssName:    'main.css',
        cssPath:    './dev/css',
        jsName:     'common.js',
        jsPath:     './dev/js'
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
        .pipe(cssnano())
        .pipe(fileRename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.outputPath.cssPath))
        .pipe(browserSync.stream());
});

gulp.task('scripts-task', function() {
    return gulp.src(config.inputPath.js)
        .pipe(concat(config.outputPath.jsName))
        .pipe(gulp.dest(config.outputPath.jsPath))
        .pipe(uglify())
        .pipe(fileRename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.outputPath.jsPath))
        .pipe(browserSync.stream());
});

gulp.task('server-task', function () {

   browserSync.init({

      server: {
          baseDir: config.developDir.path,
          directory: true
      }
   });

   gulp.watch(config.inputPath.sass, ['sass-task']);
   gulp.watch(config.inputPath.js, ['scripts-task']);
   gulp.watch(config.inputPath.html).on('change', browserSync.reload);
});

gulp.task('default', ['sass-task', 'scripts-task', 'server-task']);

gulp.task('build', ['sass-task', 'scripts-task'], function() {

    var buildCss = gulp.src('dev/css/**/*')
        .pipe(gulp.dest('app/css'))

    // var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    //     .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('dev/js/**/*')
        .pipe(gulp.dest('app/js'))

    var buildHtml = gulp.src('dev/*.html')
        .pipe(gulp.dest('app'));
});