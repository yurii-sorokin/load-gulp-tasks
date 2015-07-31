# Load gulp tasks
> Load gulp tasks using glob matching

Split your tasks across multiple files.

## Before

```js
// Gulpfile.js

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var scss = require('gulp-scss');
var scsslint = require('gulp-scss-lint');
var coffeelint = require('gulp-coffeelint');

var paths = {
  scripts: ['src/scripts/**/*.coffee', '!src/external/**/*.coffee'],
  styles: ['src/styles/**/*.scss']
};

gulp.task('lint:coffee', function() {
  return gulp.src(paths.scripts)
    .pipe(coffeelint())
    .pipe(coffeelint.reporter());
});

gulp.task('lint:scss', function() {
  return gulp.src(paths.styles)
    .pipe(scsslint());
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(coffee())
    .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint:coffee', 'scripts']);
  gulp.watch(paths.styles, ['lint:scss', 'styles']);
});

gulp.task('default', ['watch', 'lint:coffee', 'lint:scss', 'scripts', 'images']);
```

## After

```js
// tasks/lint.js

module.exports = function (gulp, options, plugins) {
  gulp.task('lint:coffee', function() {
    return gulp.src(options.paths.scripts)
      .pipe(plugins.coffeelint())
      .pipe(plugins.coffeelint.reporter());
  });

  gulp.task('lint:scss', function() {
    return gulp.src(options.paths.styles)
      .pipe(plugins.scsslint());
  });
};
```

```js
// tasks/scripts.js

module.exports = function (gulp, options, plugins) {
  gulp.task('scripts', function() {
    return gulp.src(options.paths.scripts)
      .pipe(plugins.coffee())
      .pipe(gulp.dest('build/js'));
  });
};
```

```js
// tasks/styles.js

module.exports = function (gulp, options, plugins) {
  gulp.task('styles', function() {
    return gulp.src(options.paths.styles)
      .pipe(plugins.sass())
      .pipe(gulp.dest('build/css'));
  });
};
```

```js
// tasks/watch.js

module.exports = function (gulp, options, plugins) {
  gulp.task('watch', function() {
    gulp.watch(options.paths.scripts, ['lint:coffee', 'scripts']);
    gulp.watch(options.paths.images, ['lint:scss', 'images']);
  });
};
```

```js
// Gulpfile.js

var gulp = require('gulp');

var paths = {
  scripts: ['src/scripts/**/*.coffee', '!src/external/**/*.coffee'],
  styles: ['src/styles/**/*.scss']
};

require('load-gulp-tasks')(gulp, { paths: paths });

gulp.task('default', ['watch', 'lint:coffee' ,'lint:scss', 'scripts', 'images']);
```

# Install

```
npm install load-gulp-tasks --save-dev
```

# Usage

```js
// Gulpfile.js

var gulp = require('gulp');

// Override default options
var options = {
  // Set task matching pattern.
  // See `minimatch` for more details about pattern format.
  // Type: `String|Array`
  // Default: 'tasks/**/*.js'
  pattern: ['tasks/**/*.js', '!tasks/**/dev-*.js'],

  // Provide argument options.
  // Useful for creating conditional tasks.
  // For example, `gulp deploy --port=3000`
  // Type: `Object`
  // Default: require('yarg').argv
  argv: require('minimist')(process.argv),

  // Current working directory.
  // Useful e.g. for location config files,
  // like `configFile: path.join(options.cwd, 'karma.conf.js')`
  // Type: `String`
  // Default: process.cwd()
  cwd: 'app/',

  // Add any additional parameters
  foo: 'bar'
};

// Override plugins list
// Default: require('gulp-load-plugins')()
var plugins = {
  coffee: require('gulp-coffee'),
  scss: require('gulp-scss')
};

// Load all gulp tasks matching pattern
// and provide options and plugins to each one
require('load-gulp-tasks')(gulp, options, plugins);

gulp.task('default', ['watch', 'build']);
```
