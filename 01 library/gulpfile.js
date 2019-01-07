'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var del = require('del');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var bourbon = require('node-bourbon');
var fileinclude = require('gulp-file-include');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

var src = 'ui';	//작업 폴더
var dist = 'dist';	// 배포를 위한 파일 저장 폴더
var temp = 'tmp';	//임시 저장 폴더

// 경로
var path = {
	css: src + '/common/css',
	scss: src + '/common/scss/**/*.scss',
	js: src + '/common/js/**/*.js',
	html: src + '/**/*.html',
	img: src + '/**/*.+(png|jpg|jpeg|gif)',
	fonts: src + '/common/fonts/**/*.+(eot|woff|woff2|ttf|svg)',
	icon: src + '/common/icon/**/*.+(eot|woff|woff2|ttf|svg)',
	inc: src + '/**/*.inc'
};

// 임시 저장 폴더 (해당폴더 기준으로 서버 생성)
var tmp = {
	css: temp + '/common/css',
	js: temp + '/common/js',
	fonts: temp + '/common/fonts',
	html: temp + '/**/*.html'
};

var fonts = '/common/fonts';
var icons = '/common/icon';

// server root 
var server = {
	baseDir: temp
};

// scss to css
gulp.task('sass', function() {
	return gulp.src(path.scss)
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths,
		outputStyle:'compact'
	}).on('error', sass.logError))
	.pipe(sourcemaps.write('.',{includeContent: true}))
	.pipe(gulp.dest(tmp.css))
});
// js uglify
gulp.task('copyJs', function() {
	return gulp.src(path.js)
	.pipe(gulp.dest(tmp.js))
});

// img
gulp.task('copyImg', function() {
	return gulp.src(path.img)
	.pipe(gulp.dest(temp))
});

// img build
gulp.task('buildImg', function() {
	return gulp.src(path.img)
	.pipe(gulp.dest(dist))
});

// fonts
gulp.task('fonts', function() {
  return gulp.src(path.fonts)
  .pipe(gulp.dest(temp + fonts))
})
gulp.task('icon', function() {
  return gulp.src(path.icon)
  .pipe(gulp.dest(temp + icons))
})

gulp.task('buildFonts', function() {
  return gulp.src(path.fonts)
  .pipe(gulp.dest(dist + fonts))
})
gulp.task('buildIcon', function() {
  return gulp.src(path.icon)
  .pipe(gulp.dest(dist + icons))
})


// include 파일 통합
gulp.task('copyHtml', function() {
	return gulp.src(path.html)
	.pipe(fileinclude({
		prefix: '@@',
		basepath: src
	}))
	.pipe(gulp.dest(temp))
})

// watch
gulp.task('watch', ['sass', 'copyJs', 'copyImg', 'copyHtml'], function(){
	gulp.watch(path.scss, ['sass', browserSync.reload]);
	gulp.watch(path.js, ['copyJs', browserSync.reload]);
	gulp.watch(path.img, ['copyImg', browserSync.reload]);
	gulp.watch([path.html, path.inc], ['copyHtml', browserSync.reload]);
});

// server
gulp.task('browserSync', function() {
  browserSync.init({
    server: server,
    open: "external"
  })
});

// clean
gulp.task('clean:dist', function() {  
	return del.sync(dist);
});

gulp.task('clean:tmp', function() {  
	return del.sync(temp);
});

// useref 
gulp.task('useref', function(){
  return gulp.src(tmp.html)
    .pipe(useref({searchPath:temp}))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(dist))
});

// build task 개선 필요(나은 방법 찾아보기)
gulp.task('build', function(callback) {
	runSequence('clean:dist', 'sass',[ 'copyJs', 'copyHtml', 'buildImg', 'buildFonts', 'buildIcon'], 'useref',     
		callback
	);
});

// default 
gulp.task('default', function (callback) {
	runSequence('sass', ['copyJs', 'fonts','copyHtml','watch', 'copyImg','icon'],'browserSync',
		callback
	);
});