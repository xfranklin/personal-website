const gulp = require('gulp');
const config = require('./build-config.js');

gulp.task('css', ()=>{
    const autoprefixer = require('gulp-autoprefixer');
    const cleanCss = require('gulp-clean-css');

    return gulp
        .src(`${config.dir.source}/styles/index.css`)
        .pipe(cleanCss())
        .pipe(autoprefixer('last 10 versions'))
        .pipe(gulp.dest(config.dir.build))
})

gulp.task('watch', () => {
    gulp.watch(`${config.dir.source}/**/*.css`, gulp.series('css'));
  });
  
  gulp.task('default', (done) => {
    gulp.parallel('css')(done);
  });