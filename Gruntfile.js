const sass = require('node-sass');

module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'public/main.css': 'assets/scss/style.scss'
                }
            }
        },
        concat: {
            dist: {
                src: ['assets/js/cookiehint.js', 'assets/js/responsive-table.js'],
                dest: 'public/main.js',
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/main.min.js': ['public/main.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: ['assets/scss/*.scss'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : ['assets/scss/*.scss','assets/js/*.js']
                },
                options: {
                    watchTask: true,
                    proxy: "localhost:63342/grunt-vorlage-unangetastet/public/"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    // Default task(s).
    grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'uglify']);
    grunt.registerTask('serve', ['default', 'browserSync']);
};