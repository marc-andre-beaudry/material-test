import './style';
import gulp from 'gulp';

import conf from './conf';
import path from 'path';
import browserSync from 'browser-sync';

var instance = browserSync.create();

gulp.task('serve', ['build'], function() {
    instance.init({
        server: conf.paths.serve
    });
    var watchPath = path.join(conf.paths.appRoot, '/**/*');
    console.log('watchPath:' + watchPath);
    gulp.watch(watchPath, ['serve-watch']);
});

gulp.task('serve-watch', ['build'], function (done) {
    console.log('change');
    instance.reload();
    done();
});



