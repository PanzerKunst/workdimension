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
            blueprintAreas: {
                files: {
                    "public/react-blueprint-areas.js": [
                        "javascripts/blueprint-areas/**/*.react.js"
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
                    "javascripts/models/blueprintAreas.js",

                    // Controllers
                    "javascripts/controllers/base.js",
                    "javascripts/controllers/onePageWebapp.js",
                    "javascripts/controllers/index.js",
                    "javascripts/controllers/header.js",
                    "javascripts/controllers/mainMenu.js",

                    // React
                    "public/react-site.js"
                ],
                dest: "public/site.js"
            },
            blueprintAreas: {
                options: {
                    separator:";"
                },
                src: [
                    // Base
                    "javascripts/blueprint-areas/base.js",

                    // React
                    "public/react-blueprint-areas.js"
                ],
                dest: "public/blueprint-areas.js"
            },
            all: {
                options: {
                    separator:";"
                },
                src: [
                    // Site
                    "public/site.js",

                    // Blueprint areas
                    "public/blueprint-areas.js"
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

                    // Rest
                    "public/<%= pkg.name %>.css"
                ],
                dest: "public/<%= pkg.name %>-v1.css"
            }
        },

        copy: {
            fontAwesome: {
                files: [
                    {
                        expand: true,
                        cwd: "libs/font-awesome/fonts/",
                        src: ["*"],
                        dest: "public/fonts/font-awesome"
                    }
                ]
            }
        },

        watch: {
            js: {
                files: [
                    "<%= concat.site.src %>",
                    "<%= concat.blueprintAreas.src %>",
                    "javascripts/controllers/**/*.react.js",
                    "javascripts/blueprint-areas/**/*.react.js"
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
    grunt.registerTask("buildjs",  ["eslint", "react:site", "react:blueprintAreas", "concat:site", "concat:blueprintAreas", "concat:all"]);
    grunt.registerTask("buildcss",  ["sass", "cssmin"]);
};
