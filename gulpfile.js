var gulp = require('gulp');
var args = require('get-gulp-args')();
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var del = require('del');

/// http://my.paipai.com/cgi-bin/itementry/classchoose
var paths = {
  css: 'css/**/',
  js: 'js/**/',
  images: 'images/**/',
  distDir: "dist/"
}

// gulp.task('clean', function() {
//   // 清空发布目录下的内容
//   return del([distDir]);
// });

gulp.task('build_css', function () {
    var arg1 = args[0];

    stream = gulp
        .src("*.css", { cwd: paths.css, base:'.' });
    if (arg1 !== 'debug') {
        stream = stream.pipe(cleanCSS());
    }
    stream.pipe(gulp.dest(paths.distDir));

});

gulp.task('build_js', function () {
    var arg1 = args[0];

    stream = gulp
        .src("*.js", { cwd: paths.js, base:'.' });
    if (arg1 !== 'debug') {
        stream = stream.pipe(uglify()).pipe(sourcemaps.write());
    }
    stream.pipe(gulp.dest(paths.distDir));

});

// Copy all static images
gulp.task('build_images', function() {
  return gulp.src(['*.png','*.jpg','*.jpeg'],{cwd:paths.images, base:'.'})
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.distDir));
});


// gulp.task('watch', function() {
//   gulp.watch(paths.css, ['build_css']);
//   gulp.watch(paths.js, ['build_js']);
//   gulp.watch(paths.images, ['build_images']);
// });


gulp.task('build',['build_css','build_js','build_images']);
