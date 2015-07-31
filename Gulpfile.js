/* jshint node: true */

var path = require('path');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = require('./config/paths');

require('./index')(gulp, {
    pattern: path.join(paths.tasks, '**/*.js'),
    paths: paths,
    cwd: 'lib'
}, plugins);

gulp.task('default', ['lint']);
