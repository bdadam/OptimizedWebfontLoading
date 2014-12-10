module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            fontloader: {
                files: {
                    'build/fontloader.js': 'src/js/**/*.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};