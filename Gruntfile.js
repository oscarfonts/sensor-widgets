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
            files: ['src/config.js', 'src/js/**/*.js'],
            options: {
                reporter: require('jshint-stylish')
            }
        },
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
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        clean: ["src/lib", "dist"]
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['clean', 'bower', 'jshint', 'requirejs']);

};
