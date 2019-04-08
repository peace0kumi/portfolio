"use strict";

/*
* 패키지
* */
let gulp = require('gulp'); // gulp 4.0.0
let BROWSERSYNC = require('browser-sync').create(); // 웹서버 생성
let DEL = require('del'); // 파일 및 폴더 삭제

let USEREF = require('gulp-useref'); // 주석 내 파일들만 병합해주는 플러그인
let FILEINCLUDE = require('gulp-file-include'); // file include 할 수 있는 플러그인
let CSSNANO = require('gulp-cssnano'); // CSS 경량화

let IMAGEMIN = require('gulp-imagemin'); // 이미지 압축
let UGLIFY = require('gulp-uglify-es').default; // JS 난독화

var pretty = require('gulp-pretty-html');

/*
* 경로
* */
let src = 'work'; // 작업용 폴더
let dist = 'dist'; // 배포용 폴더
let path = {
    src: {
        html: src + '/html/*.html',
        style: src + '/scss/**/*.scss',
        image: src + '/image/**/*.+(png|jpg|jpeg|gif|svg)',
        iconScss: src + '/icon/**/*.scss',
        icon: src + '/icon/**/*.+(eot|woff|woff2|ttf|svg)',
        fonts: src + '/fonts/**/*.+(eot|woff|woff2|ttf|svg)',
        include: src + '/include/*',
        script: [src + '/js/**/*.js', src + '/js/*.js'],
        vendor: src + '/vendor/**/*.js'
    },
    dist: {
        index: '/html/index.html',
        html: dist + '/html',
        image: dist + '/image',
        style: dist + '/css',
        fonts: dist + '/webfonts',
        script: dist + '/js'
    }
};

/*
* 작업용 function
* */
// browserSync - 웹서버 초기셋팅
function browserSync(done) {
    BROWSERSYNC.init({
        startPath: path.dist.index,
        server: {
            baseDir: dist
        },
        open: 'external'
    });
    done();
}
// browserSyncReload - 웹서버 새로고침
function browserSyncReload(done) {
    BROWSERSYNC.reload({
        stream: true
    });
    done();
}
// html - inc 파일 통합
function html(done) {
    return gulp.src(path.src.html)
        .pipe(FILEINCLUDE({
            prefix: '@@',
            basepath: ''
        }))
        .pipe(USEREF())
        .pipe(pretty())
        .pipe(gulp.dest(path.dist.html))
        .pipe(BROWSERSYNC.reload({
            stream: true
        }));
    done();
}


// css - css 파일 이동
function css(done) {
    return gulp.src(path.src.style)
        .pipe(gulp.dest(path.dist.style))
        .pipe(BROWSERSYNC.reload({
            stream: true
        }));
    done();
}
// moveImg - 이미지 이동
function moveImg(done) {
    return gulp.src(path.src.image)
        .pipe(gulp.dest(path.dist.image));
    done();
}
// moveJs - 개별 스크립트 이동
function moveJs(done) {
    return gulp.src(path.src.script)
        .pipe(gulp.dest(path.dist.script))
        .pipe(BROWSERSYNC.reload({
            stream: true
        }));
    done();
}
// webFonts - 웹폰트 이동
function webFonts(done) {
    return gulp.src([path.src.fonts])
        .pipe(gulp.dest(path.dist.fonts));
    done();
}
// watch - 각 function 들 실시간 변화 감지
function watch() {
    gulp.watch(path.src.script, moveJs);
    gulp.watch(path.src.style, css);
    gulp.watch(path.src.image, moveImg);
    gulp.watch(path.src.fonts, webFonts);
    gulp.watch(path.src.html, html);
}

/*
 * 배포용 function
 * */
// cssNano - CSS 경량화
function cssNano(done) {
    return gulp.src(path.dist.css)
        .pipe(CSSNANO())
        .pipe(gulp.dest(path.dist.css));
    done();
}
// script - 스크립트 난독화
function script(done) {
    return gulp.src(path.dist.script + '/*.js')
        .pipe(UGLIFY())
        .pipe(gulp.dest(path.dist.script));npg
    done();
}
// image - 이미지 압축
function image(done) {
    return gulp.src(path.src.image)
        .pipe(IMAGEMIN())
        .pipe(gulp.dest(path.dist.image));
    done();
}

// cleanDist - 배포 폴더 삭제
function cleanDist(done) {
    return DEL(dist);
    done();
}
gulp.task('cleanDist', gulp.series(cleanDist));
gulp.task('build', gulp.series(script, image, cssNano));

/*
* 작업용 task
* */
// gulp watch - 파일 변화 감지할 때 활용
gulp.task('watch',
    gulp.series(browserSync,
        gulp.parallel([watch, browserSyncReload])
    )
);
// gulp default - 작업시 활용
gulp.task('default',
    gulp.series(webFonts, moveImg, moveJs,
        gulp.parallel([css, html]), browserSync,
        gulp.parallel(watch, browserSyncReload),
    )
);