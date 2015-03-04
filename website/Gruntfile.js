module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        eslint: {
            target: [
                "javascripts/**/*.js"
            ],
            options: {
                configFile: "eslint.json"
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
            },
            standouts: {
                files: {
                    "public/react-standouts.js": [
                        "javascripts/standouts/**/*.react.js"
                    ]
                }
            }
        },

        concat: {
            site: {
                options: {
                    separator:";"
                },
                src: [
                    // Non-CDN libs
                    "libs/p.js",
                    "libs/grapnel.min.js",
                    "libs/js-breakpoints/breakpoints.js",
                    "libs/bootstrap-slider/bootstrap-slider.min.js",

                    // Global
                    "javascripts/global.js",

                    // Common

                    // Services
                    "javascripts/services/browser.js",
                    "javascripts/services/validator.js",
                    "javascripts/services/animator.js",
                    "javascripts/services/string.js",

                    // Models
                    "javascripts/models/activity.js",
                    "javascripts/models/activities.js",
                    "javascripts/models/strength.js",

                    // Controllers
                    "javascripts/controllers/base.js",
                    "javascripts/controllers/onePageWebapp.js",
                    "javascripts/controllers/index.js",
                    "javascripts/controllers/header/header.js",
                    "javascripts/controllers/header/headerModal.js",
                    "javascripts/controllers/header/registerHeaderModal.js",
                    "javascripts/controllers/header/signInHeaderModal.js",
                    "javascripts/controllers/header/signInWithLinkedIn.js",

                    // React
                    "public/react-site.js"
                ],
                dest: "public/site.js"
            },
            c1s: {
                options: {
                    separator:";"
                },
                src: [
                    "javascripts/c1s/base.js",
                    "javascripts/c1s/positionAndEmployer.js"
                ],
                dest: "public/c1s.js"
            },
            activities: {
                options: {
                    separator:";"
                },
                src: [
                    // Base
                    "javascripts/activities/base.js",
                    "javascripts/activities/controller.js",

                    // Non-React
                    "javascripts/activities/IdentifyStrengths/activity.js",
                    "javascripts/activities/SpecifyTop1Strength/activity.js",
                    "javascripts/activities/SpecifyTop2Strength/activity.js",
                    "javascripts/activities/SpecifyTop3Strength/activity.js",

                    // React
                    "public/react-activities.js"
                ],
                dest: "public/activities.js"
            },
            standouts: {
                options: {
                    separator:";"
                },
                src: [
                    // Base
                    "javascripts/standouts/base.js",

                    // Non-React

                    // React
                    "public/react-standouts.js"
                ],
                dest: "public/standouts.js"
            },
            all: {
                options: {
                    separator:";"
                },
                src: [
                    // Site
                    "public/site.js",

                    // C1s
                    "public/c1s.js",

                    // Activities
                    "public/activities.js",

                    // Standouts
                    "public/standouts.js"
                ],
                dest: "public/<%= pkg.name %>.js"
            }
        },

        sass: {
            build: {
                files: {
                    "public/<%= pkg.name %>.css": "sass/<%= pkg.name %>.scss"
                }
            }
        },

        cssmin: {
            build: {
                src: [
                    // Libs
                    "libs/h5bp/normalize.css",
                    "libs/bootstrap-slider/bootstrap-slider.css",

                    // Rest
                    "public/<%= pkg.name %>.css"
                ],
                dest: "public/<%= pkg.name %>-v1.css"
            }
        },

        copy: {
            glyphicons: {
                files: [
                    {
                        expand: true,
                        cwd: "libs/bootstrap/fonts/bootstrap/",
                        src: ["*"],
                        dest: "public/fonts/bootstrap"
                    }
                ]
            }
        },

        watch: {
            js: {
                files: [
                    "<%= concat.site.src %>",
                    "<%= concat.c1s.src %>",
                    "<%= concat.activities.src %>",
                    "<%= concat.standouts.src %>",
                    "javascripts/controllers/**/*.react.js",
                    "javascripts/activities/**/*.react.js",
                    "javascripts/standouts/**/*.react.js"
                ],
                tasks: ["buildjs"]
            },

            css: {
                files: [
                    "sass/**/*.scss"
                ],
                tasks: ["buildcss"]
            }
        }
    });

    grunt.registerTask("default", ["buildjs", "buildcss", "copy"]);
    grunt.registerTask("buildjs",  ["eslint", "react:site", "react:activities", "react:standouts", "concat:site", "concat:c1s", "concat:activities", "concat:standouts", "concat:all"]);
    grunt.registerTask("buildcss",  ["sass", "cssmin"]);
};
