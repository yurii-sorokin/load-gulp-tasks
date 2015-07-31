'use strict';

var path = require('path');
var globby = require('globby');

module.exports = function (gulp, options, plugins) {
    var pattern;
    var cwd = process.cwd();

    options = options || {};

    options.cwd = options.cwd || cwd;
    pattern = options.pattern = options.pattern || 'tasks/**/*.js';

    options.argv = options.argv || require('yargs').argv;

    plugins = plugins || require('gulp-load-plugins')({
        config: path.join(cwd, 'package.json')
    });

    globby.sync(pattern).forEach(function (file) {
        var taskConfig = require(path.join(cwd, file));

        if (typeof taskConfig === 'function') {
            taskConfig(gulp, options, plugins);
        }
    });
};
