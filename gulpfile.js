var gulp = require('gulp');
var concat = require('gulp-concat');

const webpackConfig = require('./src/config/webpack.config.js');
const webpackStream = require('webpack-stream');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const webpack2 = require('webpack');


//pass in the TypeScript folder to webpack for compileing
//configuration for web pack declared above
gulp.task('compile', function () {
    return gulp.src(['src/scripts/**/*.ts'])
        .pipe(webpackStream(webpackConfig, webpack2))
        .pipe(gulp.dest('dist'));
});

//Copy all client assets and html views
//Exclude configuration, .json, .ts files
gulp.task("clientResources", () => {
    return gulp.src(["src/**/*", "src/*.html", "!src/config", "!src/config/**", "!src/scripts", "!src/scripts/**", "!**/*.ts", "!src/*.json"])
        .pipe(gulp.dest("dist"));
});

//Delete the entire folder and recreate
gulp.task('clean', (cb) => {
    return rimraf('dist', cb);
});


//Need to configure compas ruby watch for sass
//https://www.npmjs.com/package/gulp-compass
gulp.task('watch', function () {

    gulp.watch(['src/scripts/**/*'], ['compile']).on('change', function (e) {
        console.log('File : ' + e.path + ' has been changed. Compiling.');
    });

    gulp.watch(['src/*.html'], ['clientResources']).on('change', function (e) {
        console.log('File : ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(['src/views/**/*'], ['clientResources']).on('change', function (e) {
        console.log('File : ' + e.path + ' has been changed. Compiling.');
    });


});


gulp.task("build", function (callback) {
    runSequence('clean', 'compile', 'clientResources', callback);
})