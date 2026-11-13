import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssSorter from "css-declaration-sorter";
import mmq from "gulp-merge-media-queries";
import cleanCss from "gulp-clean-css";
import terser from "gulp-terser";
import htmlMin from "gulp-htmlmin";
import svgMin from "gulp-svgmin";
import webp from "gulp-webp";
import rename from "gulp-rename";
import browserSync from "browser-sync";

// ブラウザ同期の作成
const browser = browserSync.create();
const sassCompiler = gulpSass(sass);

// パスの設定
const paths = {
  sass: "./src/assets/sass/**/*.scss",
  js: "./src/**/*.js",
  html: "./src/**/*.html",
  images: "./src/assets/img/**/*.{jpg,jpeg,png,webp}",
  svg: "./src/assets/img/**/*.svg",
  destCss: "./public/assets/css/",
  destJs: "./public/",
  destHtml: "./public/",
  destImages: "./public/assets/img/",
};

// Sassコンパイルと最適化
function compileSass() {
  return gulp
    .src([paths.sass, "!./src/assets/sass/**/_*.scss"])
    .pipe(sassCompiler().on("error", sassCompiler.logError))
    .pipe(postcss([autoprefixer(), cssSorter({ order: "smacss" })]))
    .pipe(mmq())
    .pipe(gulp.dest(paths.destCss))
    .pipe(
      cleanCss({
        level: {
          1: {
            roundingPrecision: 3,
          },
          2: {
            all: true,
          },
        },
        inline: ["all"],
        rebase: false,
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.destCss));
}

function minifyJs() {
  return gulp
    .src(paths.js)
    .pipe(
      terser({
        compress: {
          arguments: true,
          drop_console: true,
          ecma: 2015,
          keep_fargs: false,
          passes: 3,
          // pure_new: true,
          toplevel: true,
        },
        mangle: {
          toplevel: true,
        },
        format: {
          comments: /^!|license|preserve|copyright/i,
        },
        toplevel: true,
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.destJs));
}

// HTMLのフォーマットと最適化
function minifyHtml() {
  return gulp
    .src(paths.html)
    .pipe(
      htmlMin({
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        continueOnParseError: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        quoteCharacter: '"',
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
      })
    )
    .pipe(gulp.dest(paths.destHtml));
}

// 画像の最適化
function optimizeImages() {
  return gulp
    .src(paths.images, { encoding: false })
    .pipe(
      webp({
        preset: "photo",
        method: 6,
        lossless: true,
      })
    )
    .pipe(gulp.dest(paths.destImages));
}

// SVGの最適化
function optimizeSvg() {
  return gulp
    .src(paths.svg)
    .pipe(
      svgMin({
        multipass: true,
        plugins: [
          "cleanupAttrs",
          "cleanupEnableBackground",
          "cleanupIds",
          "cleanupListOfValues",
          "cleanupNumericValues",
          "collapseGroups",
          "convertColors",
          "convertEllipseToCircle",
          "convertOneStopGradients",
          "convertPathData",
          "convertShapeToPath",
          "convertStyleToAttrs",
          "convertTransform",
          "inlineStyles",
          "mergePaths",
          "mergeStyles",
          "minifyStyles",
          "moveElemsAttrsToGroup",
          "moveGroupAttrsToElems",
          "prefixIds",
          "removeAttributesBySelector",
          "removeAttrs",
          "removeComments",
          "removeDeprecatedAttrs",
          "removeDesc",
          "removeDimensions",
          "removeDoctype",
          "removeEditorsNSData",
          "removeElementsByAttr",
          "removeEmptyAttrs",
          "removeEmptyContainers",
          "removeEmptyText",
          "removeHiddenElems",
          "removeMetadata",
          "removeNonInheritableGroupAttrs",
          "removeOffCanvasPaths",
          "removeRasterImages",
          "removeScriptElement",
          "removeStyleElement",
          "removeTitle",
          "removeUnknownsAndDefaults",
          "removeUnusedNS",
          "removeUselessDefs",
          "removeUselessStrokeAndFill",
          "removeXMLNS",
          "removeXMLProcInst",
          "removeXlink",
          "reusePaths",
          "sortAttrs",
          "sortDefsChildren",
        ],
      })
    )
    .pipe(gulp.dest(paths.destImages));
}

// ブラウザのリロード
function browserReload(done) {
  browser.reload();
  done();
}

// ブラウザの初期化
function browserInit(done) {
  browser.init({
    server: { baseDir: paths.destHtml },
  });
  done();
}

// ファイル監視
function watchFiles() {
  gulp.watch(paths.sass, gulp.series(compileSass, browserReload));
  gulp.watch(paths.js, gulp.series(minifyJs, browserReload));
  gulp.watch(paths.html, gulp.series(minifyHtml, browserReload));
  gulp.watch(paths.images, gulp.series(optimizeImages, browserReload));
  gulp.watch(paths.svg, gulp.series(optimizeSvg, browserReload));
}

// タスクのエクスポート
export { watchFiles as watch, browserInit };

export const build = gulp.parallel(
  compileSass,
  minifyJs,
  minifyHtml,
  optimizeImages,
  optimizeSvg
);

export default gulp.series(build, gulp.parallel(browserInit, watchFiles));
