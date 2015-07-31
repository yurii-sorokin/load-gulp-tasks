'use strict';

module.exports = function (gulp, options, plugins) {

    gulp.task('watch', function () {
        var paths = options.paths;

        plugins.watch(paths.scripts, function () {
            gulp.start(['lint']);
        });
    });
};
