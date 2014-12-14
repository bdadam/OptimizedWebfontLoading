module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            fontloader: {
                files: {
                    'build/fontloader.js': 'src/js/**/*.js'
                }
            }
        },

        replace: {
            inlinejs: {
                src: 'src/demo.html',
                dest: 'build/demo.html',
                replacements: [{
                    from: '{{ fontloader.js }}',
                    to: '<%= grunt.file.read("build/fontloader.js") %>'
                }]
            }
        }
    });

    grunt.registerTask('default', ['uglify', 'replace']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');
};