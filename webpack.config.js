const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      path: false,
      readline: false
    }
  },
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
        <!DOCTYPE html>
        <html>
          <head><title>Hola Mundo</title></head>
          <body>
            <h1>hola mundo</h1>
            <script src="bundle.js"></script>
          </body>
        </html>
      `
    }),
    new webpack.DefinePlugin({
      "process.env.ENVIRONMENT": JSON.stringify("LOCAL")
    })
  ],
  devServer: {
    open: true,
    port: 8000
  }
};
