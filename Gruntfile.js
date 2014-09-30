module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['src/js/config.js', 'src/js/modules/**/*.js'],
            options: {
                reporter: require('jshint-stylish')
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        requirejs: {
            compile: {
                options: {
                	optimize: "uglify2",
                	optimizeCss: "standard",
                	generateSourceMaps: true,
                    mainConfigFile: "src/js/config.js",
                    baseUrl: "src/js/modules/",
                    dir: "dist"
                }
            }
        },
        clean: ["dist"]
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jshint', 'clean', 'requirejs']);

};
