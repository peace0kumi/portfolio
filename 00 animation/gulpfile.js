'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var bourbon = require('node-bourbon');
var merge = require('merge-stream');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var loc = require('path')

var src = 'app'; //작업 폴더

// 경로
var path = {
  css: src + '/assets/css',
  scss: src + '/assets/scss/*.scss',
  html: src + '/**/*.html',
  frameworkJs: src + '/platform/*.js',
  appJs: src + '/*.js'
};

// server root 
var server = {
  baseDir: src
};

// scss to css
gulp.task('sass', function() {
	return gulp.src(path.scss, {base:'scss'})
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths,
		outputStyle:'compact'
	}).on('error', sass.logError))
	 .pipe(rename(function (file) {
	 	gutil.log(file.base)
        file.dirname = loc.join(file.dirname, '../css');
      }))
	.pipe(sourcemaps.write('.',{includeContent: true}))
	.pipe(gulp.dest('ui'))
});


// watch
gulp.task('watch', ['sass'], function(){
	gulp.watch(path.scss, {cwd:'./'},['sass', browserSync.reload]);
	gulp.watch([path.html], {cwd:'./'},[browserSync.reload]);
	gulp.watch([path.frameworkJs], {cwd:'./'},[browserSync.reload]);
	gulp.watch([path.appJs], {cwd:'./'},[browserSync.reload]);
});

// server
gulp.task('browserSync', function() {
  browserSync.init({
    server: server,
    open: "external"
  })
});

gulp.task('default', function (callback) {
	runSequence('sass', ['watch'],'browserSync',
		callback
	);
});