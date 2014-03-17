module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        concat: {
            js: {
                src: 'static/js//*.js',
                dest: 'static/js/main.js'
            }
        },
        autoprefixer: {
            options: {

            },
            css: {

            }
        },
        uglify: {
            js: {
                src: 'static/main.js',
                dest: 'static/main.min.js'
            }
        },
        watch: {
            dev: {
                files: 'static//*.js',
                tasks: ['concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('css', ['autoprefixer']);
    grunt.registerTask('dev', ['watch']);

};