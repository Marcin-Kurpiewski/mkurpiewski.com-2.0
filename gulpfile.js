var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

gulp.task('reload', function () {
    browserSync.reload();

});

gulp.task('serve', ['sass'], function () {
    browserSync({
        server: 'app' // start folder files
    });

    gulp.watch('app/*.html', ['reload']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
});

gulp.task('sass', function () {

    return gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src('app/css/**/*.css')

        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(changed('dist/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('default', ['serve']);