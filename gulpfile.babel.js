'use strict';

import gulp from "gulp";
import del from "del";
import runSequence from "run-sequence";
import browserSync from "browser-sync";
import gulpLoadPlugins from "gulp-load-plugins";
import babelify from "babelify";
import browserify from "browserify";
import source from "vinyl-source-stream";
import gutil from "gulp-util";

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const browserifyScript = (script) => {
    return browserify({
        entries: `./resources/assets/js/${script}`
    })
        .transform(babelify.configure({
            presets: [`es2015`]
        }))
        .bundle()
        .on('error', function (err) {
            gutil.log(gutil.colors.red.bold(`[browserify error]`));
            gutil.log(err.message);
            gutil.log(err);
            this.emit(`end`);
        })
        .pipe(source(script))
        .pipe(gulp.dest('./public/assets/js'));
};

gulp.task('styles', () => {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        './resources/assets/sass/**/*.scss'
    ])
        .pipe($.newer('.tmp/styles'))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10,
            includePaths: [
                './node_modules/bootstrap-select/sass/',
                './node_modules/slick-carousel/slick/',
                './node_modules/fancybox/dist/scss/',
                './node_modules/fancybox/dist/helpers/scss/'
            ],
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        .pipe($.if('*.css', $.cssnano()))
        .pipe($.size({title: 'styles'}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('vendor-scripts', () => {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/slick-carousel/slick/slick.min.js',
        './node_modules/bootstrap/js/modal.js',
        './node_modules/bootstrap-select/js/bootstrap-select.js',
        './node_modules/bootstrap/js/dropdown.js',
        './resources/assets/js/jquery-ui.min.js'
    ])
        .pipe(gulp.dest('./public/assets/js/vendor'));
});

gulp.task('vendor-fancybox', () => {
    return gulp.src([
        './node_modules/fancybox/dist/js/jquery.fancybox.pack.js',
        './node_modules/fancybox/dist/helpers/js/**/*'
    ])
        .pipe(gulp.dest('./public/assets/vendor/fancybox'));
});

let scripts = [
    'main.js',
    'map.js',
    'search.js'
];

scripts.forEach((script) => {
    gulp.task(script, () => {
        return browserifyScript(script);
    });
});

gulp.task('scripts', scripts);

gulp.task('images', () => {
    gulp.src('./resources/assets/img/favicon.ico')
        .pipe(gulp.dest('./public'));

    return gulp.src('./resources/assets/img/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./public/assets/img'))
        .pipe($.size({title: 'images'}));
});

gulp.task('fonts', function () {
    return gulp.src('./resources/assets/fonts/**/*')
        .pipe(gulp.dest('./public/assets/fonts'));
});

gulp.task('clean', () => del(['.tmp', './public/assets/*'], {dot: true}));

gulp.task('dev', ['default'], () => {
    browserSync({
        notify: false,
        server: 'public',
        port: 3000
    });

    gulp.watch(['./resources/assets/sass/**/*'], ['styles', reload]);
    gulp.watch(['./resources/assets/js/**/*'], ['scripts', reload]);
    gulp.watch(['./resources/assets/img/**/*'], ['images', reload]);
    gulp.watch(['./public/**/*.html'], reload);
});

gulp.task('default', [], (cb) => {
    runSequence(
        'clean',
        ['styles', 'vendor-scripts', 'vendor-fancybox', 'fonts', 'images', 'scripts'],
        cb
    )
});
