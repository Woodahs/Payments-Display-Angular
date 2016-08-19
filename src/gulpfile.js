var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var config = require('./config.js');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var cssnano = require('gulp-cssnano');
var bulkSass = require('gulp-sass-bulk-import');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var webpack = require('webpack');
var lint = require('gulp-eslint');
var livereload = require('gulp-livereload');
var svgSprite = require('gulp-svg-sprite');
var plumber = require('gulp-plumber');
var cache = require('gulp-cached');

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(cache('js'))
        .pipe(lint({
            config: 'eslint.config.json'
        }))
        .pipe(lint.format());
});

gulp.task('svg', function() {
    return gulp.src(config.paths.svg)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    example: true,
                    sprite: config.paths.dist + 'images/sprite.svg',
                    dimensions: '-ico',
                    render: {
                        scss: true
                    }

                }
            }
        }))
        .pipe(gulp.dest(config.paths.sassDirectory))
        .pipe(notify({
            onLast: true,
            message: 'SVG sprite ready!'
        }));
});

gulp.task('js', function() {
    return gulp.src(config.webpack.mainEntry)
        .pipe(plumber())
        .pipe(webpackStream(webpackConfig), webpack)
        .on('error', notify.onError(function(err) {
            return err;
        }))
        .pipe(gulp.dest(config.paths.dist + 'js'))
        .pipe(livereload())
        .pipe(notify({
            onLast: true,
            message: 'JS ready!'
        }));
});

gulp.task('html', function() {
    return gulp.src(config.paths.html)
    	.pipe(gulp.dest(config.paths.dist))
        .pipe(livereload())
        .pipe(notify({
            message: 'HTML ready!',
            onLast: true
        }));
});

gulp.task('styles', function() {
    return gulp.src(config.paths.sass)
        .pipe(bulkSass())
        .pipe(sass({
            style: 'expanded'
        }))
        .on('error', notify.onError(function(err) {
            return err;
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano())
        .pipe(gulp.dest(config.paths.dist + 'css'))
        .pipe(notify('Styles compiled!'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(config.paths.js, ['lint', 'js']);
    gulp.watch(config.paths.sass, ['styles']);
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.svg, ['svg']);
});


gulp.task('default', ['html', 'js', 'styles', 'watch']);
