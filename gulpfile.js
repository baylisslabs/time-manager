"use strict";

let gulp = require("gulp");
let ts = require("gulp-typescript");
let source = require("vinyl-source-stream");
let buffer = require("vinyl-buffer");
let browserify = require("browserify");
let tsify = require("tsify");
let uglify = require("gulp-uglify");
let envify = require("envify/custom");
let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
let imagemin = require("gulp-imagemin");
let uglifycss = require("gulp-uglifycss");
let sourcemaps = require("gulp-sourcemaps");
let rename = require("gulp-rename");
let env = require("gulp-environment");
let del = require("del");
let runSequence = require("run-sequence");

const config = {
    debug: !env.is.production(),
    compile: {
        src: "web/src/main.ts",
        outputDir: "./dist/www/js",
        outputFile: "bundle.js",
    },
};

const tsProject = ts.createProject("tsconfig.json");

console.log("config=",config);

gulp.task('compile-server', () => {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest("dist/app"));
})

gulp.task('compile-web', () => {
    let bundler = browserify({
        debug: config.debug
      })
      .add(config.compile.src)
      .plugin(tsify, { jsx: "react", target: "es5" })
      .transform(envify())
      .bundle()
      .on('error', error => console.error(error.toString()))
      .pipe(source(config.compile.src))
      .pipe(buffer())
      .pipe(rename(config.compile.outputFile))
      .pipe(env.if.production(uglify()))
      .pipe(gulp.dest(config.compile.outputDir));
})

gulp.task("sass", () => {
    return gulp.src("web/scss/main.scss")
      .pipe(env.if.development(sourcemaps.init()))
      .pipe(sass({
        includePaths: ["node_modules/normalize-scss/sass"]
      }))
      .pipe(env.if.development(sourcemaps.write()))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(env.if.production(uglifycss({
          "maxLineLen": 80,
          "uglyComments": true
      })))
      .pipe(gulp.dest('dist/www/css'))
    });

gulp.task('images', () => {
    return gulp.src('web/images/**/*.+(png|jpg|gif|svg)')
    .pipe(env.if.production(uglifycss(imagemin())))
    .pipe(gulp.dest('dist/www/images'))
});

gulp.task('fonts', () => {
    return gulp.src('web/fonts/**/*')
    .pipe(gulp.dest('dist/www/fonts'))
})

gulp.task('static', () => {
    return gulp.src('web/**/*.+(html)')
    .pipe(gulp.dest('dist/www'))
})

gulp.task("watch", ["build"], () => {
    gulp.watch("web/src/**/*.+(ts|tsx)", ["compile-web"]);
    gulp.watch("web/scss/**/*.scss", ["sass"]);
    gulp.watch("web/images/**/*.+(png|jpg|gif|svg)", ["images"]);
    gulp.watch("web/fonts/**/*'", ["fonts"]);
    gulp.watch("web/**/*.+(html)", ["static"]);
    gulp.watch("app/**/*.ts", ["compile-server"]);
});

gulp.task('clean-web', () => {
    return del.sync('dist/www');
});

gulp.task('clean-server', () => {
    return del.sync('dist/app');
});

gulp.task('clean', () => {
    return del.sync('dist');
});

gulp.task('build-web', (callback) => {
    runSequence("clean-web",
      ["sass", "static", "images", "fonts", "compile-web"],
      callback
    );
});

gulp.task('build-server', (callback) => {
    runSequence("clean-server", "compile-server",
        callback
    );
});

gulp.task('build', (callback) => {
    runSequence("build-server","build-web",
        callback
    );
});

