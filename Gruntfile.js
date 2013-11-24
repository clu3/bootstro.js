module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: { 
        report:'min',
        banner:'/*! <%= pkg.name%> - v<%= pkg.version%> - <%=pkg.bugs.url%>*/\n'
      },
      default: {
        files: { 
          'dist/bootstro.min.js':['dist/bootstro.js'],
          'dist/bootstro3.min.js':['dist/bootstro3.js']
        }
      }
    },
    cssmin: {
      options: { report:'min' },
      default: {
        files: { 
          'dist/bootstro.min.css':['dist/bootstro.css'],
          'dist/bootstro3.min.css':['dist/bootstro3.css']
        }
      }
    },
    copy: {
      default: {
       cwd:'src/',src:'*',dest:'dist/',expand:true
      }
    },
    clean: {
      default: 
        ['dist/']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default',['clean','copy','uglify','cssmin']);
};
