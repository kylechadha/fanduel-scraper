//
// GRUNTFILE
// -----------------------------------

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
            nodemon.on('config:update', function () {
              setTimeout(function() {
                require('open')('http://localhost:8080');
              }, 1000);
            });
          }
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/styles/master.css' : 'public/styles/master.scss'
        }
      }
    },
    watch: {
      ejs: {
        files: ['**/*.html', '**/*.css'],
        options: {
          livereload: true,
        }
      },
      scss: {
        files: ['**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default',['concurrent']);
  
}