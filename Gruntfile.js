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
                'removeCombined': true,
                'logLevel': 0,
                'optimize': 'uglify2' // 'uglify2' 'none'
            },
            main: {
                options: {
                    'modules': [
                        {
                            'name': 'leaflet-label',
                            'exclude': [
                                'css',
                                'leaflet'
                            ]
                        },
                        {
                            'name': 'leaflet',
                            'include': [
                                'leaflet'
                            ],
                            'exclude': [
                                'css'
                            ]
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
                                'SensorWidget',
                                'css',
                                'text'
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
                                'errorhandler',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/gauge',
                            'include': [
                                'widget/gauge'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/jqgrid',
                            'include': [
                                'widget/jqgrid'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text',
                                'jqgrid',
                                'jquery'
                            ]
                        },{
                            'name': 'widget/map',
                            'include': [
                                'widget/map'
                            ],
                            'exclude': [
                                'leaflet',
                                'leaflet-label',
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text',
                                'widget/panel'
                            ]
                        },{
                            'name': 'widget/panel',
                            'include': [
                                'widget/panel'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/progressbar',
                            'include': [
                                'widget/progressbar'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/table',
                            'include': [
                                'widget/table'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/thermometer',
                            'include': [
                                'widget/thermometer'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/timechart',
                            'include': [
                                'widget/timechart'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text',
                                'jquery'
                            ]
                        },{
                            'name': 'widget/windrose',
                            'include': [
                                'widget/windrose'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'errorhandler',
                                'css',
                                'text',
                                'jquery'
                            ]
                        }
                        // TODO: Builder (factory? widget?); daterangepicker, moment
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
