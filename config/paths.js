'use strict';

var path = require('path');

var paths = {
    gulpfile: 'Gulpfile.js',
    src: 'lib',
    tasks: 'gulp-tasks',
    config: 'config'
};

paths.scripts = [
    paths.gulpfile,
    path.join(paths.config, '**/*.js'),
    path.join(paths.src, '**/*.js'),
    path.join(paths.tasks, '**/*.js')
];

module.exports = paths;
