const gulp = require('gulp');
const cp = require('child_process');
const browserSync = require('browser-sync').create();
const taggen = require('./__module/taggen');
const imagemin = require('gulp-imagemin');

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--drafts'], {
    // return cp.spawn('jekyll', ['build', '--drafts'], {
    stdio: 'inherit'
  }).on('close', done);
});

gulp.task('browserSync-reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('browserSync', function (done) {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
    , browser: 'google chrome'
  });

  done();
});

const watchTarget = ["**/*.+(html|scss|md)", "!_site/**/*", "!node_modules/**/*", "!__module/**/*"];

gulp.task('watch', function () {
  gulp.watch(watchTarget, gulp.series('jekyll-build', 'browserSync-reload'));
});

gulp.task('serve', gulp.series('jekyll-build', 'browserSync'));

gulp.task('taggen', async function () {
  taggen(__dirname, 'tag');
});

gulp.task('imagemin', async function() {
  gulp.src('__images/*')
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('assets/img'));
});

gulp.task('default', gulp.series('serve', 'watch'));