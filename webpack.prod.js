const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var path = require("path");

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "dist/bundle.js",
    path: path.resolve(__dirname, "./"),
  },
  plugins: [new UglifyJsPlugin()],
});
