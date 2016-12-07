import './style';
import gulp from 'gulp';
import path from 'path';

import conf from './conf';

gulp.task('build', ['styles', 'build-html', 'build-javascript', 'build-vendor']);

gulp.task('build-html', buildHtml);
gulp.task('build-javascript', buildJavascript);
gulp.task('build-vendor', buildVendor);

function buildHtml() {
    var htmlPaths = path.join(conf.paths.appRoot, '**/*.html');
    return gulp.src(htmlPaths)
        .pipe(gulp.dest(conf.paths.serve));
}

function buildJavascript() {
    var jsPaths = path.join(conf.paths.appRoot, '**/*.js');
    return gulp.src(jsPaths)
        .pipe(gulp.dest(conf.paths.serve))
}

function buildVendor() {
    var npmPackageFile = path.join(conf.paths.basePath, 'package.json');
    var config = require(npmPackageFile);
    var dependencies = [];
    for (var property in config.dependencies) {
        dependencies.push(path.join(conf.paths.appRoot, '../node_modules/' + property + '**/*'));
    }

    var vendorDest = path.join(conf.paths.serve, 'vendor');
    return gulp.src(dependencies)
        .pipe(gulp.dest(vendorDest))
}
