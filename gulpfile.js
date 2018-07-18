var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

var config = {

    path: {
        sass: './develop/sass/**/*.sass',
        html: './public/index.html'
    },

    output: {
        cssName: 'main.min.css',
        path: './public/css'
    }
}

gulp.task('sass', function () {
    return gulp.src(config.path.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('server', function () {

   browserSync.init({

      server: {
          //for the anybody files
          baseDir: "public/",
          directory: true
          //for the current file
          // baseDir: "public/",
          // directory: true
      }
   });

   gulp.watch(config.path.sass, ['sass']);
   gulp.watch(config.path.html).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'server']);