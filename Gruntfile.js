var compression = require('compression');

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
        requirejs: {
            options: {
                'appDir': 'src/',
                'baseUrl': 'js/',
                'dir': 'dist/',
                'mainConfigFile': 'src/js/main.js',
                'optimize': 'uglify2', //'none',
                'normalizeDirDefines': 'skip',
                'skipDirOptimize': true
            },
            main: {
                options: {
                    'modules': [
                        {
                            'name': '../lib/requirejs/require'
                        },
                        {
                            'name': 'main',
                            'include': [
                                'main',
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'SensorWidget'
                            ]
                        },{
                            'name': 'widget/bearing',
                            'include': [
                                'widget/bearing'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler'
                            ]
                        }

                    ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: "localhost",
                    port: 8080,
                    livereload: true,
                    middleware: function(connect, options, middlewares) {
                        middlewares.unshift(compression());
                        return middlewares;
                    }
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
    grunt.loadNpmTasks('grunt-requirejs');

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['clean', 'bower', 'jshint', 'requirejs']);

};
