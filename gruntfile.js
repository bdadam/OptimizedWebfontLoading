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
                src: ['src/demo*.html'],
                dest: 'build/',
                //files: {

                //},
                //src: 'src/demo*.html',
                //dest: 'build/demo.html',
                replacements: [{
                    from: '{{ fontloader.js }}',
                    to: '<%= grunt.file.read("build/fontloader.js") %>'
                }]
            }
        }
    });

    grunt.registerTask('default', ['uglify', 'replace']);

    grunt.registerTask('generateFonts', function() {
        var fs = require('fs');
        var util = require('util');

        var woffFile = fs.openSync('build/fonts.woff.css', 'w');
        var woff2File = fs.openSync('build/fonts.woff2.css', 'w');

        var files = fs.readdirSync('src/fonts/subsets');
        files.forEach(function(file) {
            if (!/\.woff/.test(file)) {
                return;
            }

            var b64 = fs.readFileSync('src/fonts/subsets/' + file).toString('base64');
            var format = file.indexOf('.woff2') >= 0 ? "woff2" : "woff";
            var fontWeight = /Semibold/i.test(file) ? 600 : 400;
            var fontStyle = /It/.test(file) ? 'italic' : 'normal';
            var fontFamily = file.split('.')[0].split('-')[0].split(/(?=[A-Z])/).join(' ');

            var template = '@font-face{font-family:%s;src:url(data:application/font-%s;charset=utf-8;base64,%s) format("%s");font-weight:%d;font-style:%s}\n';
            var css = util.format(template, fontFamily, format, b64, format, fontWeight, fontStyle);
            
            fs.write(format === 'woff' ? woffFile : woff2File, css);
        });

        fs.closeSync(woffFile);
        fs.closeSync(woff2File);

        /*
        var cfg = grunt.file.readJSON('src/fonts/config.json');
        for (var filename in cfg) {
            
            var path = 'build/' + filename;
            fs.writeFileSync(path, '');

            cfg[filename].forEach(function(c) {
                console.log(c);
                var b64 = fs.readFileSync('src/fonts/subsets/' + c.file).toString('base64');
                var fontFamily = c['font-family'];
                var fontWeight = c['font-weight'] || '400';
                var fontStyle = c['font-style'] || 'normal';
                var format = c['format'] || 'woff';

                var template = '@font-face{font-family:%s;src:local("%s"),url(data:application/font-%s;charset=utf-8;base64,%s) format("%s");font-weight:%d;font-style:%s}';
                var css = util.format(template, fontFamily, )


                fs.appendFileSync(path, '');
            });
        }*/
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');
};