const gulp = require('gulp');
const cp = require('child_process');
const browserSync = require('browser-sync').create();

const messages = {
   jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function(done) {
   browserSync.notify(messages.jekyllBuild);
   return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
});

gulp.task('browserSync-reload', function(done) {
   browserSync.reload();
   done();
});

gulp.task('browserSync', function(done) {
   browserSync.init({
      server: {
         baseDir: '_site'
      }
      , browser: 'google chrome'
   });

   done();
});

const watchTarget = ["**/*.+(html|scss)", "!_site/**/*", "!node_modules/**/*"];

gulp.task('watch', function() {
   gulp.watch(watchTarget, gulp.series('jekyll-build', 'browserSync-reload'));
});

gulp.task('serve', gulp.series('jekyll-build', 'browserSync'));

gulp.task('default', gulp.series('serve', 'watch'));