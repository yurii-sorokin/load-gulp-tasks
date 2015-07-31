'use strict';

module.exports = function (gulp, options, plugins) {

    gulp.task('lint:eslint', function () {
        return gulp.src(options.paths.scripts)
            .pipe(plugins.cached('lint'))
            .pipe(plugins.eslint())
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.failOnError());
    });

    gulp.task('lint', ['lint:eslint']);
};
