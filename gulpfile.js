'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del');

var app = {
	name: 'SheisFanny',
	theme: 'fanny',
	src: './src',
	tmp: './.tmp_src',
	dst: './dist',
	dst_assets: './dist/assets',
	bower: { src: './bower_components' },
	assets_path: 'assets',
	versions: {
		app: '0.0.1',
		iconfont: "1",
	}
};

gulp.task("concatScripts", function(){
   return gulp.src([
       'src/js/jquery.js',              
       'src/js/sticky/jquery.sticky.js',
       'src/js/main.js'])
   .pipe(maps.init())
   .pipe(concat("app.js"))
   .pipe(maps.write('./'))
   .pipe(gulp.dest("dist/js"));
});

gulp.task("minifyScripts", function(){
    return gulp.src("src/js/app.js")
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
    });

gulp.task('compileSass', function(){
    return gulp.src("src/scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/css'));
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return    gulp.src(["src/img/**"] , { base: ''}). 
                     pipe(gulp.dest('dist/assets/img')) &&
            gulp.src(["src/fonts/**"] , { base: ''}). 
                     pipe(gulp.dest('dist/assets/fonts')) &&
            gulp.src(["css/application.css", "js/app.min.js", 'index.html'], { base: './'}) 
                    .pipe(gulp.dest('dist'));
});

gulp.task('watchFiles', function() {
  gulp.watch('src/scss/**/*.scss', ['compileSass']);
  gulp.watch('src/js/main.js', ['concatScripts']);
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});


gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task("default", function() {
  
});
