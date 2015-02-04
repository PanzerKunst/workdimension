module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            dist: [
                'Gruntfile.js',
                'javascripts/**/*.js'
            ],
            options: {
                globals: {
                    debug: true,
                    forin: true,
                    eqnul: true,
                    noarg: true,
                    noempty: true,
                    eqeqeq: true,
                    boss: true,
                    loopfunc: true,
                    evil: true,
                    laxbreak: true,
                    bitwise: true,
                    undef: true,
                    curly: true,
                    nonew: true,
                    browser: true,
                    devel: true,
                    jquery: true
                }
            }
        },

        react: {
            site: {
                files: {
                    "public/react-site.js": [
                        "javascripts/controllers/**/*.react.js"
                    ]
                }
            },
            activities: {
                files: {
                    "public/react-activities.js": [
                        "javascripts/activities/**/*.react.js"
                    ]
                }
            }
        },

        concat: {
            site: {
                options: {
                    separator:';'
                },
                src: [
                    // Non-CDN libs
                    "libs/p.js",
                    "libs/grapnel.min.js",

                    // Global
                    "javascripts/global.js",

                    // Common

                    // Services
                    "javascripts/services/string.js",
                    "javascripts/services/validator.js",

                    // Models
                    "javascripts/models/activity.js",

                    // Controllers
                    "javascripts/controllers/base.js",
                    "javascripts/controllers/index.js",
                    "javascripts/controllers/headerModal/headerModal.js",
                    "javascripts/controllers/headerModal/registerHeaderModal.js",
                    "javascripts/controllers/headerModal/signInHeaderModal.js",

                    // React
                    "public/react-site.js"
                ],
                dest: 'public/site.js'
            },
            activities: {
                options: {
                    separator:';'
                },
                src: [
                    // Non-CDN libs

                    // Base
                    "javascripts/activities/base.js",
                    "javascripts/activities/controller.js",

                    // Non-React
                    "javascripts/activities/GlobalFindYourStrengths/activity.js",
                    "javascripts/activities/GlobalFindYourStrengths2/activity.js",

                    // React
                    "public/react-activities.js"
                ],
                dest: 'public/activities.js'
            },
            all: {
                options: {
                    separator:';'
                },
                src: [
                    // Site
                    "public/site.js",

                    // Activities
                    "public/activities.js"
                ],
                dest: 'public/<%= pkg.name %>.js'
            }
        },

        sass: {
            build: {
                files: {
                    'public/<%= pkg.name %>.css': 'sass/<%= pkg.name %>.scss'
                }
            }
        },

        /* Task fails
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors: true,
                    consolidateMediaQueries: true
                },
                files: {
                    'public/<%= pkg.name %>.css': 'public/<%= pkg.name %>.css'
                }
            }
        }, */

        cssmin: {
            build: {
                src: [
                    // Libs
                    'libs/h5bp/normalize.css',

                    // Rest
                    'public/<%= pkg.name %>.css'
                ],
                dest: 'public/<%= pkg.name %>-v1.css'
            }
        },

        watch: {
            js: {
                files: [
                    '<%= concat.site.src %>',
                    '<%= concat.activities.src %>',
                    'javascripts/controllers/**/*.react.js',
                    'javascripts/activities/**/*.react.js'
                ],
                tasks: ['buildjs']
            },

            css: {
                files: [
                    'sass/**/*.scss'
                ],
                tasks: ['buildcss']
            }
        }
    });

    grunt.registerTask('default', ['buildjs', 'buildcss']);
    grunt.registerTask('buildjs',  ['jshint', 'react:site', 'react:activities', 'concat:site', 'concat:activities', 'concat:all']);
    grunt.registerTask('buildcss',  ['sass', 'cssmin']);
};
