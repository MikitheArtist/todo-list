const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sourcemaps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");
const del = require("del");
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

gulp.task('styles', function () {
  return gulp.src('./src/app.scss')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task("clean", function(){
  return del("public");
});

gulp.task("scripts", function() {
  return browserify({
    entries: "./src/app.js",
    debug: isDevelopment
  })
    .transform(babelify, { presets: [ '@babel/preset-env' ] })
    .bundle()
    .on("error", function (error) {
      gutil.log(gutil.colors.red("Error: " + error), "\n", error.codeFrame);
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(gulpIf(!isDevelopment, uglify()))
    .pipe(gulp.dest("./public/scripts"));
});

gulp.task("views", function() {
  return gulp.src("src/**/*.html")
     .pipe(gulp.dest("public"));

});

gulp.task("build", gulp.series(
  "clean", 
   gulp.parallel("styles", "scripts", "views")
));

gulp.task("watch", function () {
  gulp.watch("./src/**/*.html", gulp.series("views"));
  gulp.watch("./src/**/*.{css,scss}", gulp.series("styles"));
  gulp.watch("./src/**/*.js", gulp.series("scripts"));
});

gulp.task("serve", function () {
  browserSync.init({
    server: "./public",
    port: 8080
  });

  browserSync.watch("./**/*.*").on("change", browserSync.reload);
});

gulp.task("default", gulp.series(
  "build",
  gulp.parallel(
    "watch",
    "serve"    
  )
));
