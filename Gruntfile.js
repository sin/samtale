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
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            css: {
                src: 'static/css/main.css',
                dest: 'static/css/main.css'
            }
        },
        requirejs: {
            compile: {
                options: {
                    wrap: true,
                    optimize: 'none',
                    mainConfigFile: "static/js/main.js",
                    name: "almond",
                    include: "main",
                    insertRequire: ['main'],
                    out: "static/js/optimized.js"
                }
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
            },
            css: {
                files: 'static/css/main.css',
                tasks: ['autoprefixer']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('css', ['watch:css']);
    grunt.registerTask('rjs', ['requirejs']);
    grunt.registerTask('dev', ['watch']);

};