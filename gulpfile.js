const { series, parallel } = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload


// Tarefas Css
function tarefasCSS(callback) {

    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './vendor/owl/css/owl.css',
        './vendor/fontawesome/fontawesome.css',
        './vendor/jquery-ui-1.13.2.custom/jquery-ui.min.css',
        './src/css/style.css'
    ])
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' })) // libs.min.css
        .pipe(gulp.dest('./dist/css'))

    return callback()
}

// Tarefas JS
function tarefasJS(callback) {
    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './vendor/owl/js/owl.js',
        './vendor/jquery-mask/jquery.mask.js',
        './vendor/jquery-ui-1.13.2.custom/jquery-ui.js',
        './src/js/custom.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' })) // libs.min.js
        .pipe(gulp.dest('./dist/js'))

    return callback()
}

// Imagens
function tarefasImagem(callback) {

    gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}

// POC - Proof of concept
function tarefasHTML(callback) {

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))

    return callback()
}

// End
function end(cb){
    console.log("Tarefas concluídas")
    return cb()
}

gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change',process) // repete o processo quando alterar algo em src
    gulp.watch('./src/**/*').on('change', reload)
})

// Series x parallel
const process = series( tarefasHTML, tarefasJS, tarefasCSS, end)


exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem

exports.default = process