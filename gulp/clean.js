import clean from 'gulp-clean';
import gulp from 'gulp';
import conf from './conf';

gulp.task('clean', function(){
    return gulp.src(conf.paths.serve, {read: false})
        .pipe(clean());
});
