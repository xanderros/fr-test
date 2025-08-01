const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/scripts/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/js"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "defaults",
                  useBuiltIns: "usage",
                  corejs: 3,
                  modules: "commonjs",
                },
              ],
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  useESModules: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  optimization: {
    minimize: true,
  },
};
