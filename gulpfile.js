const gulp = require('gulp');
const concat = require('gulp-concat');
const webpackConfig = require('./src/config/webpack.config.js');
const webpackStream = require('webpack-stream');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const webpack2 = require('webpack');
const compass = require('gulp-compass');
const gulpConnect = require('gulp-connect');

//Make sure you perform gulp build before gulp start
//Build will prepare the dist dir and files initially
gulp.task('start', ['connect', 'watch']);

//START gulp tasks

//compass for scss process and
//images are passed seperately
gulp.task('compass', function () {
    gulp.src('sass/*.scss')
        .pipe(compass({
            config_file: './config.rb'
        }));

    gulp.src('sass/images/*')
        .pipe(gulp.dest('dist/assets/images'));
});
 

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

//END gulp tasks


//watch and connet for development
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

    gulp.watch(['sass/**/*'], ['compass']).on('change', function (e) {
        console.log('File : ' + e.path + ' has been changed. Compiling.');
    });

});

gulp.task('connect', function() {
  gulpConnect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task("build", function (callback) {
    runSequence('clean', 'compile', 'clientResources', 'compass', callback);
})