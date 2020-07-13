// https://michaelmovsesov.com/articles/jekyll-es6-workflow
// https://stackoverflow.com/questions/30818236/webpack-create-a-bundle-with-each-file-in-directory

const path = require("path");

module.exports = {
  mode: "production",
  watch: true,
  entry: path.join(__dirname, "__js/post/game-of-life", "game-of-life.js"),
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
  devServer: {
    contentBase: path.join(__dirname, '_site'),
    port: 9000
  },
}
