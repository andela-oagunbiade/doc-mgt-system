const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('default', () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      PORT: process.env.PORT || 9000
    }
  });
});
