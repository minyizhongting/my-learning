var gulp = require('gulp');
var fs = require('fs');
var sass = require('gulp-ruby-sass');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var through2 = require('through2');

function delBlankLines() {
	return through2.obj(function(file, enc, cb) {
		var result = file.contents.toString().replace(/\n\r/g, ''); // 去掉.css文件中的空格
		file.contents = Buffer.from(result);
		this.push(file);
		cb();
	});
};

gulp.task('sass:compile', function() {
	return sass('./style_s.scss', {style: 'compact'})
			.pipe(delBlankLines())
			.pipe(gulp.dest('./'))
});

gulp.task('less:compile', function() {
	return gulp.src('./style_l.less')
			.pipe(less())
			.pipe(gulp.dest('./'))
});

gulp.task('server', ['sass:compile','less:compile'], function() {
	browserSync({
		open: false,
		server: {
			baseDir: './'
		}
	});

	gulp.watch('./*.scss', ['sass:compile']);
	gulp.watch('./*.less', ['less:compile']);

	gulp.watch(['./*.html', './*.css', './*.js'], browserSync.reload);
});


gulp.task('default', ['server']);