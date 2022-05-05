module.exports = {
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
};