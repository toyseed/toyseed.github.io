const gulp = require('gulp');
const cp = require('child_process');
const browserSync = require('browser-sync').create();
const taggen = require('./__module/taggen');
const imagemin = require('gulp-imagemin');

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
};

gulp.task('jekyll-build', function(done) {
  browserSync.notify(messages.jekyllBuild);
  return cp
    .spawn('bundle', ['exec', 'jekyll', 'build', '--drafts'], {
      // return cp.spawn('jekyll', ['build', '--drafts'], {
      stdio: 'inherit',
    })
    .on('close', done);
});

gulp.task('browserSync-reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('browserSync', function(done) {
  browserSync.init({
    server: {
      baseDir: '_site',
    },
    browser: 'google chrome',
  });

  done();
});

const watchTarget = [
  '**/*.+(html|scss|md)',
  'assets/js/*.js',
  '!_site/**/*',
  '!node_modules/**/*',
  '!__module/**/*',
];

gulp.task('watch', function() {
  gulp.watch(watchTarget, gulp.series('jekyll-build', 'browserSync-reload'));
});

gulp.task('serve', gulp.series('jekyll-build', 'browserSync'));

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

gulp.task('watch:babel', () => {
  const files = fs.readdirSync('./__js');
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (path.extname(file) !== '.js') {
      continue;
    }

    let filepath = path.join('__js', file);
    initBundlerWatch(filepath);
  }
  return gulp.watch('./__js/**/*.js').on('change', initBundlerWatch);
});

const bundlers = new Map();
function initBundlerWatch(filepath) {
  if (bundlers.has(filepath)) {
    return;
  }

  const bundler = browserify(filepath);
  bundler.transform(babelify);

  bundlers.set(filepath, bundler);

  const watcher = watchify(bundler);
  const filename = path.basename(filepath);

  function bundle() {
    bundler
      .bundle()
      .on('error', error => console.error(error))
      .pipe(source(filename))
      .pipe(gulp.dest('./assets/js'));
  }

  watcher.on('update', bundle);
  watcher.on('time', time => console.log(`build ${filename} in ${time}ms`));

  bundle();
}

gulp.task(
  'default',
  gulp.parallel(gulp.series('serve', 'watch'), 'watch:babel'),
);
