import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';

// Ruta a los archivos Sass
const paths = {
  scss: 'src/scss/**/*.scss',  // Archivos Sass en src/scss
  cssDest: 'css',              // Carpeta de destino para los archivos CSS
};

// Tarea para compilar Sass a CSS
gulp.task('sass', function () {
  return gulp.src('src/scss/main.scss')  // Archivo principal de Sass
    .pipe(sourcemaps.init()) // Inicializa el mapeo de fuentes
    .pipe(sass().on('error', sass.logError)) // Compila Sass y maneja los errores
    .pipe(autoprefixer({ // Agrega prefijos de navegador automáticamente
      cascade: false
    }))
    .pipe(cleanCSS()) // Minifica el CSS
    .pipe(rename({ suffix: '.min' })) // Renombra el archivo CSS a .min.css
    .pipe(sourcemaps.write('./')) // Escribe los mapas de fuente en la misma carpeta
    .pipe(gulp.dest(paths.cssDest)); // Guarda el archivo compilado en la carpeta css/
});

// Tarea para observar los cambios en los archivos Sass
gulp.task('watch', function () {
  gulp.watch(paths.scss, gulp.series('sass')); // Observa los cambios en los archivos Sass
});

// Tarea por defecto
gulp.task('default', gulp.series('sass', 'watch'));
