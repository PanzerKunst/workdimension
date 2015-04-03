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
                    "libs/classnames.js",

                    // Global
                    "javascripts/global.js",

                    // Common

                    // Services
                    "javascripts/services/browser.js",
                    "javascripts/services/validator.js",
                    "javascripts/services/animator.js",
                    "javascripts/services/string.js",
                    "javascripts/services/keyboard.js",

                    // Models
                    "javascripts/models/blueprintArea.js",
                    "javascripts/models/blueprintAreas.js",

                    // Controllers
                    "javascripts/controllers/base.js",
                    "javascripts/controllers/onePageWebapp.js",
                    "javascripts/controllers/workbookAreaCommon.js",
                    "javascripts/controllers/main-menu/linkedInAuthenticator.js",

                    // React
                    "public/react-site.js"
                ],
                dest: "public/site.js"
            },
            mockData: { // TODO: remove
                options: {
                    separator:";"
                },
                src: [
                    "javascripts/mock-data/addItemToAreaTasks.js"
                ],
                dest: "public/mock-data.js"
            },
            all: {
                options: {
                    separator:";"
                },
                src: [
                    // Site
                    "public/site.js",

                    // Mock data    TODO: remove
                    "public/mock-data.js"
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
                    "<%= concat.mockData.src %>",   // TODO: remove
                    "javascripts/controllers/**/*.react.js"
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
    grunt.registerTask("buildjs",  ["eslint", "react:site", "concat:site", "concat:mockData" /* TODO: remove */, "concat:all"]);
    grunt.registerTask("buildcss",  ["sass", "cssmin"]);
};
