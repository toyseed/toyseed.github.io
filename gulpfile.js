const gulp = require('gulp');
const cp = require('child_process');
const taggen = require('./__module/taggen');
const imagemin = require('gulp-imagemin');

const fs = require('fs');
const path = require('path');

gulp.task('jekyll-build', function(done) {
  console.log(process.env.PATH);
  return cp
    .spawn('bundle', ['exec', 'jekyll', 'build', '--drafts', '--watch'], {
      stdio: 'inherit',
    })
    .on('error', (error) => console.error(error))
    .on('close', done);
});

gulp.task('webpack', function(done) {
  return cp
    .spawn('webpack', [])
    .on('error', (error) => console.error(error))
    .on('close', done);
});

gulp.task('taggen', async function() {
  taggen(__dirname, 'tag');
});

gulp.task('imagemin', async function() {
  gulp
    .src('__images/*')
    .pipe(
      imagemin({
        progressive: true,
        optimizationLevel: 5,
      }),
    )
    .pipe(gulp.dest('assets/img'));
});

gulp.task(
  'default',
  gulp.parallel('jekyll-build', 'webpack'),
);

