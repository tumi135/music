/**
 * Created by ASUS on 2018/3/13.
 */
var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlclean = require("gulp-htmlclean");
var less = require("gulp-less");
var postcss = require("gulp-postcss");//可以添加前缀的，（用于less）
var cssnano = require("cssnano");
var autoprefixer = require("autoprefixer");
var uglify = require("gulp-uglify");
var stripDebug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var deporder  = require("gulp-deporder");  //改变文件的加载顺序，如js文件里把jq移到a,b前面加载

var connect = require("gulp-connect");


//判断当前是开放环境还是生产环境
var devMode = process.env.NODE_ENV == "development";


var folder = {
    src : "./src/",
    build : "./build/"
};

//gulp.src()读文件
//gulp.dest()写文件
//gulp.taask()任务
//gulp.watch()监听


//流读取文件  task running grunt
gulp.task("images",function () {
    gulp.src(folder.src + "images/*")
        .pipe(newer(folder.build + "images"))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + "images"))
});

gulp.task("html",function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload());
        if(!devMode){
        // .pipe(newer(folder.build + "images"))
        page.pipe(htmlclean())
        }
        page.pipe(gulp.dest(folder.build + "html"))
});

// gulp.task("js",function () {
//     var page = gulp.src(folder.src + "js/*")
//         .pipe(connect.reload());
//     if(!devMode){
//             page.pipe(uglify())
//                 .pipe(stripDebug())
//     }
//         page.pipe(deporder())
//         .pipe(concat("main.js"))
//         .pipe(gulp.dest(folder.build + "js"))
// });
gulp.task("js",function () {
    var page = gulp.src(folder.src + "js/*");
    if(!devMode){
        page.pipe(stripDebug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.build + "js/"))
});


gulp.task("css",function () {
    var options = [autoprefixer(),cssnano()];
    var page = gulp.src(folder.src + "css/*")
        .pipe(less())
        .pipe(connect.reload());
    if(!devMode){
        page.pipe(postcss(options))
    }

        page.pipe(gulp.dest(folder.build + "css"))
});

gulp.task("watch",function () {
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "images/*",["images"]);
    gulp.watch(folder.src + "css/*",["css"]);
});

gulp.task("server",function () {
    connect.server({
        port:"8090",
        liverrload:true//浏览器自动刷新
    })
});

//弄一个依赖
gulp.task("default",["html","images","js","css","watch","server"]);
