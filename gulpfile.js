'use strict'

const buildWay = './build/'

const gulp = require('gulp') // npm install gulp
const rigger = require('gulp-rigger') // npm install gulp-rigger
const watch = require('gulp-watch') // npm install --save-dev gulp-watch
const prefixer = require('gulp-autoprefixer') // npm install --save-dev gulp-autoprefixer
const uglify = require('gulp-uglify-es').default // npm install --save-dev gulp-uglify
const sass = require('gulp-sass') // npm install gulp-less
const cssmin = require('gulp-csso') // npm install --save-dev gulp-clean-css
const rimraf = require('rimraf') // npm install rimraf
const browserSync = require('browser-sync') // npm install browser-sync
const reload = browserSync.reload

const path = {
  build: { // Тут мы укажем куда складывать готовые после сборки файлы. xxx - название сайта
    html: buildWay,
    js: buildWay + 'js/',
    css: buildWay + 'css/',
    image: buildWay + 'image/'
  },
  update: { // исходные папкки
    html: 'src/',
    js: 'src/js/',
    css: 'src/sass/',
    image: 'src/image/'
  },
  src: { // Пути откуда брать исходники
    html: 'src/*.html', // Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js: 'src/js/*.js', // В стилях и скриптах нам понадобятся только main файлы
    style: 'src/sass/*.sass',
    image: 'src/image/*'
  },
  watch: { // Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/sass/**/*.sass',
    image: 'src/image/*'
  },
  clean: './' + buildWay
}

let config = { // Автообновление страницы в браузере
  server: {
    baseDir: './' + buildWay
  },
  tunnel: false,
  host: 'localhost',
  port: 8080,
  logPrefix: 'koterion'
}

let plugins = {
  autoprefixer: {
    options: {
      browsers: [
        'last 2 version',
        'Chrome >= 20',
        'Firefox >= 20',
        'Opera >= 12',
        'Android 2.3',
        'Android >= 4',
        'iOS >= 6',
        'Safari >= 6',
        'Explorer >= 8'
      ],
      cascade: false
    }
  }
}

gulp.task('html:build', function () {
  gulp.src(path.src.html) // Выберем файлы по нужному пути
    .pipe(rigger()) // Прогоним через rigger
    .pipe(gulp.dest(path.build.html)) // Выплюнем их в папку build
    .pipe(reload({stream: true}))
})

gulp.task('js:build', function () {
  gulp.src(path.src.js) // Найдем наш main файл
    .pipe(rigger()) // Прогоним через rigger
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify()) // Сожмем наш js
    .pipe(gulp.dest(path.build.js)) // выплёвуем
    .pipe(reload({stream: true})) // И перезагрузим наш сервер для обновлений
})

gulp.task('style:build', function () {
  gulp.src(path.src.style) // Выберем наш main.css
    .pipe(sass())
    .pipe(prefixer(plugins.autoprefixer.option)) // Добавим вендорные префиксы
    .pipe(gulp.dest(path.build.css))
    .pipe(cssmin()) // Сожмем
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true})) // И перезагрузим наш сервер для обновлений
})

gulp.task('image:build', function () {
  gulp.src(path.src.image) // Выберем файлы по нужному пути
    .pipe(gulp.dest(path.build.image)) // Выплюнем их в папку build
    .pipe(reload({stream: true})) // И перезагрузим наш сервер для обновлений
})

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'image:build'
])

gulp.task('watch', function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start('html:build')
  })
  watch([path.watch.style], function (event, cb) {
    gulp.start('style:build')
  })
  watch([path.watch.js], function (event, cb) {
    gulp.start('js:build')
  })
  watch([path.watch.image], function (event, cb) {
    gulp.start('image:build')
  })
})

gulp.task('webserver', function () {
  browserSync(config)
})

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb)
})

gulp.task('default', ['build', 'webserver', 'watch'])
