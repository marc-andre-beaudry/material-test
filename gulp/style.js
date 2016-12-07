import gulp from 'gulp';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpSass from 'gulp-sass';
import gulpSourcemaps from 'gulp-sourcemaps';
import path from 'path';
import concat from 'gulp-concat';

import conf from './conf';

gulp.task('styles', function() {
    let sassOptions = {
        style: 'expanded',
    };
    var paths = path.join(conf.paths.appRoot, '**/*.scss');
    return gulp.src(paths)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpSass(sassOptions))
        .pipe(gulpAutoprefixer())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(conf.paths.serve))
});
