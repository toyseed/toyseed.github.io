// https://michaelmovsesov.com/articles/jekyll-es6-workflow
// https://stackoverflow.com/questions/30818236/webpack-create-a-bundle-with-each-file-in-directory

const path = require("path");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: "production",
  watch: true,
  entry: {
    "game-of-life": path.join(__dirname, "__js/post/game-of-life", "game-of-life.js"),
    "tile-break": path.join(__dirname, "__js/post/tile-break", "tile-break.js"),
    "color-tester": path.join(__dirname, "__js/post/color-tester", "color-tester-rx.js"),
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "assets/js"),
    publicPath: '/assets/js/',
  },
  // mode: "development",
  // module: {
  //   rules: [
  //     {
  //       test: /.js$/,
  //       exclude: [
  //           path.resolve(__dirname, "node_modules"),
  //       ],
  //       loader: "babel-loader",
  //     },
  //   ],
  // },
  // resolve: {
  //   extensions: [".json", ".js", ".jsx"],
  // },
  // devServer: {
  //   contentBase: path.join(__dirname, '_site'),
  //   port: 9000
  // },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',  //localhost로 사용
      port: 3000,			//포트 3000을 사용  (이미 사용중이면 1씩 증가된 포트로 사용)
      files: ['./_site/**/*'], //해당 경로 내 html 파일이 자동으로 동기화 (이 부분이 없으면 html파일 변경사항은 자동 동기화 안됨)
      server: {baseDir: ['_site']}, // server의 Base 디렉토리를 dist로 지정,
      browser: 'google chrome'
    }),
  ]
}
