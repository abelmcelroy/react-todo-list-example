require('dotenv').config();
const webpack = require("webpack");

module.exports = (_, argv) => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: require('path').resolve(__dirname, 'dist'),
    },
    devServer: {
      static: {
        directory: require('path').resolve(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        API_URL: argv.mode === "production" ?
          JSON.stringify(process.env.API_URL) :
          JSON.stringify("http://localhost:3001"),
      })
    ]
  }
};