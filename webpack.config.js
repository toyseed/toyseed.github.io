// https://michaelmovsesov.com/articles/jekyll-es6-workflow
// https://stackoverflow.com/questions/30818236/webpack-create-a-bundle-with-each-file-in-directory

const path = require("path");
const glob = require("glob");

module.exports = {
  mode: "production",
  watch: true,
  // entry: path.join(__dirname, "__js", "*"),
  entry: {
    js: glob.sync("./__js/**/*.js"),
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "assets/js"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [
            path.resolve(__dirname, "node_modules"),
        ],
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  }
}
