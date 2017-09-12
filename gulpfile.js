
    var gulp = require('gulp');
    var htmlmin = require('gulp-htmlmin');
    var uglify = require('gulp-uglify');
    var less = require('gulp-less');
    var cleanCss = require('gulp-clean-css');
    var rename = require('gulp-rename');
    var concat = require('gulp-concat');
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');

    //html处理
    gulp.task('html',function(){
        gulp.src(['src/**/*.html','index.html'])
            .pipe(htmlmin({
                collapseWhitespace:true,
                minifyJS:true,
                minifyCSS:true,
                removeComments:true
            }))
            .pipe(gulp.dest('dist'));
    });

    //less处理
    gulp.task('less',function(){
        gulp.src('src/less/index.less')
            .pipe(less())
            .pipe(cleanCss())
            .pipe(gulp.dest('dist/css')) ;
    });

    //配置要打包的第三包路径
    var jsLibs = [
        'node_modules/art-template/lib/template-web.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/bootstrap.js'
    ];
    //合并第三方包为一个js
    gulp.task('jsLib',function(){
        gulp.src(jsLibs)
            .pipe(concat('lib.js'))
            .pipe(gulp.dest('dist/js'));
    });

    //打包CommonJS模块








    var jsModules = [
        //首页
        'src/js/index.js',
        //用户
        'src/js/user/login.js',
        'src/js/user/repass.js',
        'src/js/user/profile.js',
        //讲师
        'src/js/teacher/add.js',
        'src/js/teacher/edit.js',
        'src/js/teacher/list.js',
        //课程
        'src/js/course/add.js',
        'src/js/course/edit1.js',
        'src/js/course/edit2.js',
        'src/js/course/edit3.js',
        'src/js/course/list.js',
        //学科分类
        'src/js/category/add.js',
        'src/js/category/edit.js',
        'src/js/category/list.js'
    ];
    gulp.task('js',function(){
        jsModules.forEach(function(jsPath){
            var pathArr = jsPath.split('/');
            var jsName = pathArr.pop();
            pathArr.shift();
            browserify('src/js/index.js').bundle() //打包index.js
                .pipe(source('index.js'))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest('dist/' + pathArr.join('/')));
        });
    });

    //添加统一打包的任务
    gulp.task('build',function(){
        gulp.run(['html','less','jsLib','js']);
    });
    //监听文件变化,自动打包
    gulp.task('default',function(){
        gulp.run('build');
        gulp.watch(['src/**/*.html','index.html'],function(){
            gulp.run('html');
        });
        gulp.watch(['src/**/*.less'],function(){
            gulp.run('less');
        });
        gulp.watch(['src/**/*.js'],function(){
            gulp.run('js');
        });
    });