// Generated on 2015-02-14 using generator-bootstrap-less 3.2.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var appConfig = {
        app: 'web',
        dist: 'dist'
    };

    var deployConfig = grunt.file.readJSON('.deploy-config.json');

    grunt.initConfig({
            appConfig: appConfig,
            watch: {
                coffee: {
                    files: ['<%= appConfig.app %>/coffee/{,*/}*.coffee'],
                    tasks: ['coffee']
                },
                less: {
                    files: ['<%= appConfig.app %>/less/{,*/}*.less'],
                    tasks: ['less']
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= appConfig.app %>/*.html',
                        '{.tmp,<%= appConfig.app %>}/css/{,*/}*.css',
                        '{.tmp,<%= appConfig.app %>}/js/{,*/}*.js',
                        '<%= appConfig.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            },
            connect: {
                options: {
                    port: 9000,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: 'localhost',
                    livereload: 35729
                },
                livereload: {
                    options: {
                        open: true,
                        base: [
                            '.tmp',
                            '<%= appConfig.app %>'
                        ]
                    }
                },
                test: {
                    options: {
                        port: 9001,
                        base: [
                            '.tmp',
                            'test',
                            '<%= appConfig.app %>'
                        ]
                    }
                },
                dist: {
                    options: {
                        base: '<%= appConfig.dist %>'
                    }
                }
            },
            clean: {
                dist: {
                    files: [{
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= appConfig.dist %>/*',
                            '!<%= appConfig.dist %>/.git*'
                        ]
                    }]
                },
                server: '.tmp'
            },
            coffee: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= appConfig.app %>/coffee',
                        src: '{,*/}*.coffee',
                        dest: '<%= appConfig.app %>/js',
                        ext: '.js'
                    }]
                }
            },
            less: {
                dist: {
                    files: {
                        '<%= appConfig.app %>/css/main.css': ['<%= appConfig.app %>/less/main.less']
                    },
                    options: {
                        sourceMap: false,
                        sourceMapFilename: '<%= appConfig.app %>/less/main.css.map',
                        sourceMapBasepath: '<%= appConfig.app %>/',
                        sourceMapRootpath: '/'
                    }
                }
            },
            copy: {
                dist: {
                    files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= appConfig.app %>',
                        dest: '<%= appConfig.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            'fonts/{,*/}*.*',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}'
                        ]
                    }]
                },
                server: {
                    files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= appConfig.app %>/bower_components/font-awesome/fonts/',
                        dest: '<%= appConfig.app %>/fonts/font-awesome',
                        src: ['*']
                    }, {
                        expand: true,
                        dot: true,
                        cwd: '<%= appConfig.app %>/bower_components/bootstrap/dist/fonts/',
                        dest: '<%= appConfig.app %>/fonts/glyphicons',
                        src: ['*']
                    }]
                }
            },
            cssmin: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= appConfig.app %>/css',
                        src: ['*.css', '!*.min.css'],
                        dest: '<%= appConfig.dist %>/css',
                        ext: '.min.css'
                    }]
                }
            },
            html_minify: {
                options: {},
                //files: {
                //    'dest/index.html': ['src/index.html']
                //}
                all: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= appConfig.app %>',
                            src: ['*.html'],
                            dest: '<%= appConfig.dist %>',
                            ext: '.html'
                        }
                    ]
                }
            },
            'sftp-deploy': {
                build: {
                    auth: deployConfig.auth,
                    cache: '.sftpCache.json',
                    src: appConfig.dist,
                    dest: deployConfig.dest,
                    exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db', 'dist/tmp'],
                    serverSep: '/',
                    concurrency: 4,
                    progress: true
                }
            }
        }
    );

    grunt.registerTask('build', [
        'clean:dist',
        'copy:server',
        'html_minify',
        'cssmin',
        'copy'
    ]);

    grunt.registerTask('default', [
        'clean',
        'test',
        'build'
    ]);

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'coffee',
            'less',
            'copy:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('deploy', [
        'build',
        'sftp-deploy'
    ]);
}
;
