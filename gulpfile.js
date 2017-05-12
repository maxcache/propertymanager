var gulp = require('gulp');
var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps');
const webPackConfig = require('./src/config/webpack.config.js');
const webPack = require('webpack-stream');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');



gulp.task('compile', function () {    
    return gulp.src(['src/**/*.ts'])
        .pipe(webPack(webPackConfig))
        .pipe(gulp.dest('dist'));
});

//Delete the entire folder and recreate
gulp.task('clean', (cb) => {
    return rimraf('dist', cb);
});


gulp.task('watch', function () {

    gulp.watch(['src/scripts/*.ts'], ['clean','compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });


});


gulp.task("build", function (callback) {
    runSequence('clean','compile', callback);
})