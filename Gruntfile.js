module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: 'src/lib',
                    layout: 'byComponent'
                }
            }
        },
        jshint: {
            files: ['src/**/*.js', '!src/lib/**', 'examples/**/*.js'],
            options: {
                reporter: require('jshint-stylish')
            }
        },
        /*
        requirejs: {
            compile: {
                options: {
                    optimize: "uglify2",
                    optimizeCss: "standard",
                    preserveLicenseComments: false,
                    mainConfigFile: "src/config.js",
                    baseUrl: "src/js",
                    dir: "dist/js"
                }
            }
        },
        */
        connect: {
            server: {
                options: {
                    hostname: "localhost",
                    port: 8080,
                    livereload: true
                }
            }
        },
        watch: {
            files: ['src/**', '!src/lib/**', 'examples/**'],
            tasks: ['jshint'],
            options: {
                livereload: true,
                nospawn: true
            }
        },
        clean: ["src/lib", "dist"]
    });

    var path = require('path');
    grunt.event.on('watch', function(action, filepath) {
        if (path.extname(filepath) != ".js") {
            filepath = [];
        }
        grunt.config('jshint.files', filepath);
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['clean', 'bower', 'jshint' /*, 'requirejs'*/ ]);

};
