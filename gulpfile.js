const gulp = require('gulp');
const nodemon = require('nodemon');
const jsFiles = ['*.js', 'server/**/*.js'];

gulp.task('debug', ()=>{
    let options = {
      script: 'app.js',
      delayTime: 1,
      env: {
        'PORT':3000
      },
      watch: jsFiles,
      execMap: {
        js: "node --inspect"
      }
    };
    return nodemon(options)
      .on('restart', ()=>{
        console.log('restarting server...');
      });
});

gulp.task('serve', ()=>{
  let options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT':3000
    },
    watch: jsFiles
  };
  return nodemon(options)
  .on('restart', ()=>{
    console.log('restarting server...');
  });
});

gulp.task('default', ['serve']);
