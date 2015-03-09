var gulp = require('gulp'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee');

gulp.task('default', ['sass', 'coffee'])

// CSS
gulp.task('sass', function() {
    gulp.src('./src/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/'))
});
gulp.watch('./src/*.scss', ['sass']);

// JS
gulp.task('coffee', function() {
    gulp.src('./src/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('./dist/'))
});
gulp.watch('./src/*.coffee', ['coffee']);
