const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();
const nunjucksRender = require("gulp-nunjucks-render");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fs = require("fs");
const path = require("path");

// Paths
const paths = {
  styles: {
    src: "src/styles/main.scss",
    watch: "src/styles/**/*.scss",
    critical: "src/styles/critical.scss",
    dest: "public/css",
  },
  scripts: {
    src: "src/scripts/main.js",
    watch: "src/scripts/**/*.js",
    dest: "public/js",
  },
  templates: {
    src: "src/pages/**/*.njk",
    watch: "src/**/*.njk",
    dest: "public",
  },
  images: {
    src: "src/img/**/*",
    dest: "public/img",
  },
  fonts: {
    src: "src/fonts/**/*",
    dest: "public/fonts",
  },
};

// Clean public folder
function clean() {
  return del(["public/**", "!public"]);
}

// Process critical CSS
function criticalCSS() {
  return gulp
    .src(paths.styles.critical)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "Critical CSS",
          message: error.message,
        })),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Process main styles
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "Styles",
          message: error.message,
        })),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Process templates (without critical CSS inline)
function templates() {
  return gulp
    .src(paths.templates.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "Templates",
          message: error.message,
        })),
      })
    )
    .pipe(
      nunjucksRender({
        path: ["src/components", "src/layouts"],
      })
    )
    .pipe(gulp.dest(paths.templates.dest))
    .pipe(browserSync.stream());
}

// Inline critical CSS into templates
function inlineCriticalCSS() {
  const criticalCSSPath = path.join(__dirname, "public/css/critical.css");

  if (fs.existsSync(criticalCSSPath)) {
    const criticalCSS = fs.readFileSync(criticalCSSPath, "utf8");

    return gulp
      .src(paths.templates.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "Templates",
            message: error.message,
          })),
        })
      )
      .pipe(
        nunjucksRender({
          path: ["src/components", "src/layouts"],
          data: {
            criticalCSS: criticalCSS,
          },
        })
      )
      .pipe(gulp.dest(paths.templates.dest))
      .pipe(browserSync.stream());
  } else {
    console.log("Critical CSS file not found, skipping inline...");
    return gulp.src(paths.templates.src);
  }
}

// Process scripts
function scripts() {
  return gulp
    .src("src/scripts/main.js")
    .pipe(plumber())
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Copy images without changes
function images() {
  return gulp
    .src(paths.images.src, { buffer: true })
    .pipe(gulp.dest(paths.images.dest));
}

// Copy fonts
function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

// Development server
function serve() {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
    port: 3001,
    open: true,
    notify: false,
  });

  // Watch files
  gulp.watch(
    paths.styles.watch,
    gulp.series(styles, criticalCSS, inlineCriticalCSS)
  );
  gulp.watch(paths.scripts.watch, scripts);
  gulp.watch(paths.templates.watch, inlineCriticalCSS);
  gulp.watch(paths.images.src, images);
}

// Build
const build = gulp.series(
  clean,
  gulp.parallel(criticalCSS, styles, scripts, templates, images, fonts),
  inlineCriticalCSS
);

// Development
const dev = gulp.series(build, serve);

// Export tasks
exports.clean = clean;
exports.criticalCSS = criticalCSS;
exports.styles = styles;
exports.scripts = scripts;
exports.templates = templates;
exports.inlineCriticalCSS = inlineCriticalCSS;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.default = dev;
